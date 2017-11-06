import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Response } from '@angular/http';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Product } from './product';

@Injectable()
export class ProductService {
    private productsUrl = environment.apiUrl + 'products';  // URL to web api
    private headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

    constructor( private http: HttpClient ) { }

    getProducts(): Promise<Array<Product>> {
        return this.http
            .get<Product[]>( this.productsUrl )
            .toPromise()
            //      .then((response) => {
            //        console.log(response);
            //        console.log("json:" + response);
            //        //return response as Product[];
            //        return response;
            //      })
            .catch( this.handleError );
    }

    getProduct( id: number ): Promise<Product> {

        return this.http
            .get( this.productsUrl + "/" + id )
            .toPromise()
            .then(( response ) => {
                return response as Product;
            } )
            .catch( this.handleError );
    }

    save( product: Product ): Promise<Product> {
        if ( product.id ) {
            return this.put( product );
        }
        return this.post( product );
    }

    delete( product: Product ): Promise<Response> {
        const url = `${this.productsUrl}/${product.id}`;

        return this.http
            .delete( url, { headers: this.headers } )
            .toPromise()
            .catch( this.handleError );
    }

    delete2( productId: number ): Promise<Response> {
        const url = `${this.productsUrl}/${productId}`;
        console.log("deleting ... " + productId);
        return this.http
            .delete( url, { headers: this.headers } )
            .toPromise()
            .catch( this.handleError );
    }

    // Add new Product
    private post( product: Product ): Promise<Product> {
        return this.http
            .post( this.productsUrl, JSON.stringify( product ), { headers: this.headers } )
            .toPromise()
            .then( res => {
                console.log( "RESULT: " + res );
                const json = res;
                //          if (json typeof Number) 
                //            return json as Product;
                //          else
                //            return this.getProduct(json);
            } )
            .catch( this.handleError );
    }

    // Update existing Product
    private put( product: Product ): Promise<Product> {
        const url = `${this.productsUrl}/${product.id}`;

        return this.http
            .put( url, JSON.stringify( product ), { headers: this.headers } )
            .toPromise()
            .then(() => product )
            .catch( this.handleError );
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'An error occurred', error );
        return Promise.reject( error.message || error );
    }
}
