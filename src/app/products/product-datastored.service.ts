import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Response } from '@angular/http';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

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


    loadAll() {
        console.log('loadAll begin... ' +  `${this.baseUrl}/products?transform=true` );
        this.http.get<any>( `${this.baseUrl}/products?transform=true` ).subscribe(
            data => {
                this.dataStore.products = data.products.map( p => {
                    if ( p.additionalAttributes ) {
                        p.additionalAttributes = JSON.parse( p.additionalAttributes );
                        console.log( p );
                    }
                    return p;
                } );
                this._products.next( Object.assign( {}, this.dataStore ).products );
            }, error => console.log( 'Could not load products.' ) );
    }


    load( id: number | string ) {
        this.http.get<any>( `${this.baseUrl}/products/${id}?transform=true` ).subscribe( data => {
            let notFound = true;

            const pr: Product = data;
            pr.additionalAttributes = JSON.parse( data.additionalAttributes );
            this.dataStore.products.forEach(( item, index ) => {
                if ( item.id === pr.id ) {
                    this.dataStore.products[index] = pr;
                    notFound = false;
                }
            } );

            if ( notFound ) {
                this.dataStore.products.push( pr );
            }

            this._products.next( Object.assign( {}, this.dataStore ).products );
        }, error => console.log( 'Could not load product.' ) );
    }

    
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
