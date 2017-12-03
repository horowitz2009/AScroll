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

@Injectable()
export class CartService {

    private _cart: Cart;
    cart: Observable<Cart>;
    private _cart2: BehaviorSubject<Cart>;
    private dataStore: {
        cart: Cart
    };

    private baseUrl = environment.cartUrl;  // URL to web api
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
        this.saveCart();
    }

    saveCart(): void {
        this.http.post( `${this.baseUrl}/create`, { "product_id": 1 } )
            .subscribe( res => {
                console.log( "cart saved", res );
                //this._products.next( Object.assign( {}, this.dataStore ).products );
            }, error => console.log( 'Could not save cart.', error ) );
    }

    loadCartIfAny(): void {
        //todo make it server-side php loadCart()...
        //this.load();

        //        console.log( 'Loading cart if any...' );
        //        if ( this.cookieService.check( 'cart_token' ) ) {
        //            console.log( "Found cart token. Loading from db..." );
        //        } else {
        //            console.log( "no cart token..." );
        //
        //        }
    }

    load() {
        this.http.get<any>( `${this.baseUrl}/load` ).subscribe( data => {

            const c: Cart = data;
            this.dataStore.cart = c;

            this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        }, error => {
            console.log( 'Could not load cart.' );
            this.dataStore.cart = new Cart();
            this._cart2.next( Object.assign( {}, this.dataStore ).cart );
        } );
    }

}
