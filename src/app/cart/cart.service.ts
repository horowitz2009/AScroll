import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
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

@Injectable()
export class CartService {

    private _cart: Cart;
    cart: Observable<Cart>;
    private _cart2: BehaviorSubject<Cart>;
    private dataStore: {
        cart: Cart
    };

    private baseUrl = 'cart.php';  // URL to web api
    private headers = new HttpHeaders( { 'Content-Type': 'application/json' } );


    constructor( private http: HttpClient, private cookieService: CookieService ) {

        this._cart = new Cart();
        console.log( "CART SERVICE created" );
    }

    getCart(): Cart {
        return this._cart;
    }

    addToCart( product: Product, quantity: number = 1 ) {
        const item = new Item( product, quantity );
        this._cart.addItem( item );
        console.log( this._cart );
        this.saveCart();
    }

    private serialize( cart: Cart ): string {
        return JSON.stringify( cart, ( key, value ) => {
            if ( key === 'product' ) {
                return value.id;
            } else {
                return value;
            }
        } );
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

    createCart(): void {
        this.http.post( `${this.baseUrl}/create`, { "product_id": 1, "quantity": 1 } )
            .subscribe( res => {
                console.log( "cart saved", res );
                //this._products.next( Object.assign( {}, this.dataStore ).products );
            }, error => console.log( 'Could not save cart.', error ) );
    }
    
    loadCartIfAny(): Promise<any>  {
        
        
        const req = this.http.get<any>( `${this.baseUrl}/read` );
        
        req.subscribe( data => {
            const c: Cart = this.deserialize( data );
            this.dataStore.cart = c;

            this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        }, error => {
            console.log( 'Could not load cart.' );
            this.dataStore.cart = new Cart();
            this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        } );
        
        req.subscribe(
            data => {
                console.log( data );
            }, error => console.log( 'Could not load cart.' ) );

        return req.toPromise();
        
    }

    private deserialize( data: any ): Cart {
        const c = new Cart();
        console.log( data.items );
        return c;
    }

    load() {
        this.http.get<any>( `${this.baseUrl}/read` ).subscribe( data => {

            const c: Cart = this.deserialize( data );
            this.dataStore.cart = c;

            this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        }, error => {
            console.log( 'Could not load cart.' );
            this.dataStore.cart = new Cart();
            this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        } );
    }

}
