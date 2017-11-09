import { Component, OnInit } from '@angular/core';
import { ProductDatastoredService } from "./product-datastored.service";
import { Product } from '../products/product';
import { Observable } from "rxjs/Observable";

@Component( {
    selector: 'app-products',
    templateUrl: './products.component.html',
    styles: []
} )
export class ProductsComponent implements OnInit {

    constructor( private productService: ProductDatastoredService ) { }





    products: Observable<Product[]> = undefined;

    ngOnInit() {

        //this.productService.loadAll();

        this.products = this.productService.products; // subscribe to entire collection
        
        console.log("init prodicts...");

        const myevent = new CustomEvent( 'mycustomevent', { detail: 'fuck you' } );

        document.getElementById( 'home' ).dispatchEvent( myevent );
        //myElement.dispatchEvent(myEvent);



    }

}
