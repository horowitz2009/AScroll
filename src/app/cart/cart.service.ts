import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Response } from '@angular/http';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Cart } from "./cart";
import { Product } from "../products/product";
import { Item } from "./item";
import { CookieService } from "ngx-cookie-service";
import 'rxjs/add/operator/toPromise';
import { ProductDatastoredService } from "../products/product-datastored.service";
import { ShippingData } from "./checkout/shipping-data";
import { PaymentData } from "./checkout/payment-data";
import { Order } from "./order";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/skipWhile';

@Injectable()
export class CartService {
    
    private _order: Order;

    private _orders: Order[];

    private baseUrl = 'cart.php';  // URL to web api
    private headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

    private _cartSubject: BehaviorSubject<Cart>;
    private dataStore: {
        cart: Cart
    };

    //PUBLIC
    get cartObs(): Observable<Cart> {
        return this._cartSubject.asObservable();
    }
    

    constructor( private http: HttpClient, private cookieService: CookieService, private productService: ProductDatastoredService ) {
        this.dataStore = { cart: new Cart() };
        this._cartSubject = <BehaviorSubject<Cart>>new BehaviorSubject( this.dataStore.cart );

        this._order = new Order();
        console.log( "CART SERVICE created" );
    }

    updateOrderStatuses( status: string, orderIds: number[] ): void {
        const body = {"status": status, "orderIds": orderIds};
        
        let s = '';
        orderIds.forEach( id => s = s + id + ', ' );
        console.log( "IDs", s );
        
        this.http.post<any>( `${this.baseUrl}/updateorderstatuses`, body )
        .subscribe( res => {
            console.log( "orders updated", res );

        }, error => console.log( 'Could not update orders.', error ) );

    }

    getOrder(): Order {
        return this._order;
    }

    removeItem( item: Item ) {
        this.dataStore.cart.removeItem( item );
        this.saveCart();
        this.next();
    }

    addToCart( product: Product, quantity: number = 1 ) {
        const item = new Item( product, quantity );
        this.dataStore.cart.addItem( item );
        this.saveCart();
        this.next();
    }


    saveCart(): void {
        console.log( "CART TO BE SAVED", JSON.stringify( this.dataStore.cart ) );
        this.http.post<any>( `${this.baseUrl}/create`, this.serialize( this.dataStore.cart ) )
            .subscribe( res => {
                console.log( "cart saved", res );
                //this._products.next( Object.assign( {}, this.dataStore ).products );
                const cn = res.cn;
                const cv = res.cv;
                this.cookieService.set( cn, cv, 30, '/' );

            }, error => console.log( 'Could not save cart.', error ) );
    }

    resetCart(): void {
        //TODO now new Cart() could work...
        this.dataStore.cart.clear();
        this.next();
    }

    private serialize( cart: Cart | Order ): string {
        return JSON.stringify( cart, ( key, value ) => {
            if ( key === 'product' ) {
                return value.id;
            } else {
                return value;
            }
        } );
    }


    finalize( onSuccess?, onError?): void {
        this._order = this.toOrder();

        const jsonStr = this.serialize( this._order );
        console.log( "FINALIZE THIS", jsonStr );
        const amount = this.dataStore.cart.getTotal();
        const cnt = this.dataStore.cart.getCount();

        const req = this.http.post<any>( `${this.baseUrl}/finalize`, jsonStr );


        req.subscribe(
            res => {
                console.log( "cart finalized", res );
                //this._products.next( Object.assign( {}, this.dataStore ).products );
                console.log( "AMOUNT", amount );
                console.log( "CNT", cnt );
                console.log( "RES", res );
                this.resetCart();
                const cn = res.cn;
                this.cookieService.delete( cn, '/' );
                this._order.id = res.orderId;
                onSuccess();

            },
            error => {
                console.log( 'Could not save cart.', error );
                onError( error );
            }
        );

    }

    loadSimple(): Promise<Cart> {
        const req = this.http.get<any>( `${this.baseUrl}/read` );
        
        req.subscribe( data => {
            console.log( 'http CART LOADED', data );
            const c: Cart = this.deserialize( data );
            
            this.dataStore.cart = c;
            this.next();
        } );
        
        return req.toPromise();
        
    }
    
    next() {
        this._cartSubject.next( Object.assign( {}, this.dataStore ).cart );
    }

    

    private deserialize( data: any ): Cart {
        const c = new Cart();
        //console.log( data.items );
        console.log( 'deserializing', data );
        data.items.forEach(( itemDTO, index ) => {
            const item = new Item( this.productService.getProductById( itemDTO.product_id ), itemDTO.quantity );
            c.addItem( item );
        } );

        if ( data.cartData ) {
            const s = data.cartData;
            c.shippingData = new ShippingData( s.name, s.phone );
            c.shippingData.address = s.address;
            c.shippingData.email = s.email;
            c.shippingData.wantInvoice = s.wantInvoice === "1";
            c.shippingData.invoiceInfo = s.invoiceInfo;

            c.paymentData = new PaymentData();
            c.paymentData.methodOfPayment = s.methodOfPayment;
        }
        return c;
    }
    
    toOrder(): Order {
        const order = new Order();
        const cart = this.dataStore.cart.clone();

        order.items = cart.items;
        order.shippingData = cart.shippingData;
        order.paymentData = cart.paymentData;
        order.totalAmount = cart.getTotal();
        order.totalCount = cart.getCount();
        order.status = 'pending';
        if ( order.paymentData.methodOfPayment !== 'cash' ) {
            order.status = 'waitingPayment';
        }

        return order;
    }

//    private deserializeOrder( data: any ): Order {
//        const order = new Order();
//        console.log( 'single order please', data );
//        data.items.forEach(( itemDTO, index ) => {
//            const item = new Item( this.productService.getProductById( itemDTO.product_id ), itemDTO.quantity );
//            order.addItem( item );
//        } );
//
//        order.id = data.id;
//        order.status = data.status;
//        order.created = data.created;
//
//        order.shippingData = new ShippingData( data.name, data.phone );
//        order.shippingData.address = data.address;
//        order.shippingData.email = data.email;
//        order.shippingData.wantInvoice = data.wantInvoice === "1";
//        order.shippingData.invoiceInfo = data.invoiceInfo;
//
//        order.paymentData = new PaymentData();
//        order.paymentData.methodOfPayment = data.methodOfPayment;
//
//        return order;
//    }

}
