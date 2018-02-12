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

@Injectable()
export class CartService {

    private _cart: Cart;
    cart: Observable<Cart>;
    private _cart2: BehaviorSubject<Cart>;

    private _order: Order;
    //    private dataStore: {
    //        cart: Cart
    //    };

    private baseUrl = 'cart.php';  // URL to web api
    private headers = new HttpHeaders( { 'Content-Type': 'application/json' } );


    constructor( private http: HttpClient, private cookieService: CookieService, private productService: ProductDatastoredService ) {
        //this.dataStore = { cart: new Cart() };
        this._cart = new Cart();
        this._cart2 = new BehaviorSubject( this._cart );
        
        this._order = new Order();
        console.log( "CART SERVICE created" );
    }

    getCart(): Cart {
        return this._cart;
    }
    
    getOrder(): Order {
        return this._order;
    }

    getCart2(): BehaviorSubject<Cart> {
        return this._cart2;
    }

    removeItem( item: Item ) {
        this._cart.removeItem( item );
        this.saveCart();
        this._cart2.next( this._cart );
    }

    addToCart( product: Product, quantity: number = 1 ) {
        const item = new Item( product, quantity );
        this._cart.addItem( item );
        console.log( this._cart );
        this.saveCart();
        this._cart2.next( this._cart );
    }


    saveCart(): void {
        console.log( "CART TO BE SAVED", JSON.stringify( this._cart ) );
        this.http.post<any>( `${this.baseUrl}/create`, this.serialize( this._cart ) )
            .subscribe( res => {
                console.log( "cart saved", res );
                //this._products.next( Object.assign( {}, this.dataStore ).products );
                const cn = res.cn;
                const cv = res.cv;
                this.cookieService.set( cn, cv, 30, '/' );

            }, error => console.log( 'Could not save cart.', error ) );
    }

    resetCart(): void {
        this._cart.clear();
        this._cart2.next( this._cart );
    }

    private serialize( cart: Cart  | Order): string {
        return JSON.stringify( cart, ( key, value ) => {
            if ( key === 'product' ) {
                return value.id;
            } else {
                return value;
            }
        } );
    }
    
    toOrder(): Order {
        const order = new Order();
        const cart = this._cart.clone();
        
        order.items = cart.items;
        order.shippingData = cart.shippingData;
        order.paymentData = cart.paymentData;
        order.totalAmount = cart.getTotal();
        order.totalCount = cart.getCount();
        order.status = 'pending';
        if (order.paymentData.methodOfPayment !== 'cash') {
            order.status = 'waitingPayment';
        }
        
        return order;
    }

    finalize(onSuccess?, onError? ): void {
        this._order = this.toOrder();
        
        const jsonStr = this.serialize(this._order);
        console.log( "FINALIZE THIS", jsonStr );
        const amount = this._cart.getTotal();
        const cnt = this._cart.getCount();

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
                onError(error);
            }
        );

    }


    createCart(): void {
        this.http.post( `${this.baseUrl}/create`, { "product_id": 1, "quantity": 1 } )
            .subscribe( res => {
                console.log( "cart saved", res );
                //this._products.next( Object.assign( {}, this.dataStore ).products );
            }, error => console.log( 'Could not save cart.', error ) );
    }

    loadSimple() {
        const req = this.http.get<any>( `${this.baseUrl}/read` );

        req.subscribe( data => {
            console.log( 'CART READ', data );
            const c: Cart = this.deserialize( data );
            this._cart.items = []; //.splice( 0, this._cart.items.length );
            this._cart.items = c.items;

            //            c.items.forEach(( item, i ) => {
            //                this._cart.items.push( item );
            //            } );

            this._cart.shippingData.load( c.shippingData );
            this._cart.paymentData.load( c.paymentData );

            //this.dataStore.cart = c;
            //this._cart = c;
            //this._cart2.next( Object.assign( {}, this.dataStore ).cart );

            this._cart2.next( this._cart );
        } );
    }

    loadCartIfAny(): Promise<any> {


        const req = this.http.get<any>( `${this.baseUrl}/read` );

        req.subscribe( data => {
            const c: Cart = this.deserialize( data );
            //this.dataStore.cart = c;

            //this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        }, error => {
            console.log( 'Could not load cart.' );
            //this.dataStore.cart = new Cart();
            //this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        } );

        req.subscribe(
            data => {
                console.log( data );
            }, error => console.log( 'Could not load cart.' ) );

        return req.toPromise();

    }

    private deserialize( data: any ): Cart {
        const c = new Cart();
        //console.log( data.items );
        console.log( 'QWERTY', data );
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

    load() {
        this.http.get<any>( `${this.baseUrl}/read` ).subscribe( data => {

            const c: Cart = this.deserialize( data );
            //this.dataStore.cart = c;

            //this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        }, error => {
            console.log( 'Could not load cart.' );
            //this.dataStore.cart = new Cart();
            //this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        } );
    }

}
