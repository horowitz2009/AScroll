import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Response } from '@angular/http';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

import { Product } from './product';

@Injectable()
export class ProductDatastoredService {

    products: Observable<Product[]>;
    private _products: BehaviorSubject<Product[]>;
    private dataStore: {
        products: Product[]
    };


    private productsUrl = environment.apiUrl + 'products';  // URL to web api
    private baseUrl = environment.apiUrl;  // URL to web api
    private headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

    constructor( private http: HttpClient ) {
        this.dataStore = { products: [] };
        this._products = <BehaviorSubject<Product[]>>new BehaviorSubject( [] );
        this.products = this._products.asObservable();
    }

    getProductsDS(): Product[] {
        return this.dataStore.products;
    }

    loadAll(): Promise<Product> {
        //console.log( 'loadAll begin... ' + `${this.baseUrl}/products?transform=true` );
        const req = this.http.get<any>( `${this.baseUrl}/products?transform=true` );

        req.subscribe(
            data => {
                //console.log( data );
                this.dataStore.products = data.products.map( p => {
                    const pp = new Product();
                    $.extend(pp, p);
                    if ( pp.additionalAttributes ) {
                        pp.additionalAttributes = JSON.parse( pp.additionalAttributes );
                    }
                    return pp;
                } );
                this._products.next( Object.assign( {}, this.dataStore ).products );
                console.log('ALL PRODUCTS LOADED', this.dataStore.products);
            }, error => console.log( 'Could not load products.' ) );

        return req.toPromise();
    }

    loadAll2(): Observable<Product> {
        //console.log( 'loadAll begin... ' + `${this.baseUrl}/products?transform=true` );
        const req = this.http.get<any>( `${this.baseUrl}/products?transform=true` );

        req.map(
            data => {
                //console.log( data );
                this.dataStore.products = data.products.map( p => {
                    const pp = new Product();
                    $.extend(pp, p);
                    if ( pp.additionalAttributes ) {
                        pp.additionalAttributes = JSON.parse( pp.additionalAttributes );
                    }
                    return pp;
                } );
                this._products.next( Object.assign( {}, this.dataStore ).products );
                console.log('ALL PRODUCTS LOADED', this.dataStore.products);
            }, error => console.log( 'Could not load products.' ) );

        return req;
    }
    
//    getProduct( id: number | string ) {
//        this.load( id );
//        return this.products
//            // (+) before `id` turns the string into a number
//            .map( products => products.find( pr => pr.id === +id ) );
//    }

    getProductById( id: number | string ): Product {
        const p = this.dataStore.products.find( x => x.id === +id );

        //const p =  this.dataStore.products.filter(x => x.id === id)[0];

        return p;
    }

    //not used
//    load( id: number | string ) {
//        console.log("LOAD JUST ONE", id);
//        this.http.get<any>( `${this.baseUrl}/products/${id}?transform=true` ).subscribe( data => {
//            let notFound = true;
//
//            const pr: Product = data;
//            pr.additionalAttributes = JSON.parse( data.additionalAttributes );
//            this.dataStore.products.forEach(( item, index ) => {
//                if ( item.id === pr.id ) {
//                    this.dataStore.products[index] = pr;
//                    notFound = false;
//                }
//            } );
//
//            if ( notFound ) {
//                this.dataStore.products.push( pr );
//            }
//
//            this._products.next( Object.assign( {}, this.dataStore ).products );
//        }, error => console.log( 'Could not load product.' ) );
//    }
//

    create( product: Product ) {
        product.id = null;
        if ( product.additionalAttributes && ( typeof product.additionalAttributes === 'object' ) ) {
            product.additionalAttributes = JSON.stringify( product.additionalAttributes );
        }


        this.http.post( `${this.baseUrl}/products`, product )
            .subscribe( res => {
                //console.log( typeof res );
                const newId: number = res as number;
                product.id = newId;

                if ( product.additionalAttributes && ( typeof product.additionalAttributes === 'string' ) ) {
                    product.additionalAttributes = JSON.parse( product.additionalAttributes );
                }
                this.dataStore.products.push( product );
                this._products.next( Object.assign( {}, this.dataStore ).products );
            }, error => console.log( 'Could not create product.' ) );
    }

    update( product: Product ) {
        if ( product.additionalAttributes && ( typeof product.additionalAttributes === 'object' ) ) {
            product.additionalAttributes = JSON.stringify( product.additionalAttributes );
        }

        this.http.put( `${this.baseUrl}/products/${product.id}`, product )
            .subscribe( res => {

                if ( product.additionalAttributes && ( typeof product.additionalAttributes === 'string' ) ) {
                    product.additionalAttributes = JSON.parse( product.additionalAttributes );
                }

                this.dataStore.products.forEach(( pr, i ) => {
                    if ( pr.id === product.id ) {
                        this.dataStore.products[i] = product;
                    }
                } );

                this._products.next( Object.assign( {}, this.dataStore ).products );
            }, error => console.log( 'Could not update product.' ) );
    }

    remove( productId: number ) {
        this.http.delete( `${this.baseUrl}/products/${productId}` ).subscribe( res => {
            this.dataStore.products.forEach(( t, i ) => {
                if ( t.id === productId ) { this.dataStore.products.splice( i, 1 ); }
            } );

            this._products.next( Object.assign( {}, this.dataStore ).products );
        }, error => console.log( 'Could not delete product.' ) );
    }

}
