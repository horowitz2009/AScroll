import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products/product';
import { Observable } from "rxjs/Observable";
import { ProductDatastoredService } from "../products/product-datastored.service";


interface ProductsRes {
    products: any[];
}


@Component( {
    selector: 'app-rest',
    templateUrl: './rest.component.html',
    styleUrls: ['./rest.component.scss']
} )
export class RestComponent implements OnInit {
    foo = 'bar';
    constructor( private http: HttpClient, private productService: ProductDatastoredService ) { }
    productsOld: Product[];
    products: Observable<Product[]> = undefined;
    product: Product;
    id: number;

    reload() {
        this.productService.loadAll();
    }

    createNew() {
        //insert a product
        const p = new Product();
        p.name = 'some name goes here';
        p.published = false;
        p.categoryId = 112;
        p.additionalAttributes = JSON.stringify( { "a": "jeff is also here" } );
        p.price = 22.90;
        //p.createdOn = '20171021';
        this.http.post( 'http://localhost/api2.php/products',
            p ).subscribe( res => {
                console.log( typeof res );
                const newId: number = res as number;
                //TODO read the product again
                this.readOne( newId );
            } );

    }

    updateExisting( id: number ) {
        //insert a product
        const p = new Product();
        p.id = id;
        p.name = 'new name ouch';
        p.additionalAttributes = JSON.stringify( { "a": "NOT AGAIN" } );
        this.http.put( 'http://localhost/api2.php/products/' + id,
            p ).subscribe( res => {

                console.log( res );
                console.log( typeof res );
                //const newId: number = res as number;
                //TODO read the product again
                //this.readOne( newId );
            } );

    }

    deleteOne( id: number ) {
        console.log( 'deleting ...' + id );
        this.http.delete( 'http://localhost/api2.php/products/' + id ).subscribe( res => {

            console.log( res );
            console.log( typeof res );
            //const newId: number = res as number;
            //TODO read the product again
            //this.readOne( newId );
        } );
    }

    getOne( id: number ) {
        this.product = this.productService.getProductById( id );
    }

    readOne( id: number ) {
        //get single product by id
        //this.productService.load( id );
        this.http.get<any>( 'http://localhost/api2.php/products/' + id + '?transform=true' ).subscribe(
            data => {
                console.log( 'read one and store it in this.product' );
                this.product = data;
                this.product.additionalAttributes = JSON.parse( data.additionalAttributes );
            }
        );

    }

    readOneOld( id: number ) {
        //get single product by id
        this.http.get<any>( 'http://localhost/api2.php/products/' + id + '?transform=true' ).subscribe(
            data => {
                console.log( 'read one and store it in this.product' );
                this.product = data;
                this.product.additionalAttributes = JSON.parse( data.additionalAttributes );
            }
        );

    }

    ngOnInit() {
        console.log( 'REST on init' );
        this.productService.loadAll();
        
        this.productService.products.subscribe(() => { console.log( "get 1" ); this.getOne( 1 ); } );
        
        this.products = this.productService.products; // subscribe to entire collection


        //get list of products
        this.http.get<any>( 'http://localhost/api2.php/products?transform=true' ).subscribe(
            data => {
                console.log( 'good' );
                this.productsOld = data.products.map( p => {
                    if ( p.additionalAttributes ) {
                        //console.log('ahaaa');
                        //console.log(p.additionalAttributes);
                        console.log( 'good11' );
                        p.additionalAttributes = JSON.parse( p.additionalAttributes );
                        console.log( 'good12' );
                        //console.log(p.additionalAttributes);
                    }
                    return p;
                } );
            }
        );
        console.log( "get 1" );
        this.getOne( 1 );

    }


    /*this.base.getTransportTypes()
    .map(transportTypes => transportTypes
      .map(trType => ({ id: trType.TransportTypeId, name: trType.Name }))
    )
    .subscribe(options => this.transportOptions = options)*/

}
