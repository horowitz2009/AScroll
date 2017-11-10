import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductDatastoredService } from "./product-datastored.service";
import { Product } from '../products/product';
import { Observable } from "rxjs/Observable";

@Component( {
    selector: 'app-products',
    templateUrl: './products.component.html',
    styles: []
} )
export class ProductsComponent implements OnInit, AfterViewInit {

    constructor( private productService: ProductDatastoredService ) { }




    products: Product[];
    //products$: Observable<Product[]> = undefined;

    ngAfterViewInit() {
        console.log("after view products...");

        const myevent = new CustomEvent( 'mycustomevent', { detail: 'fuck you' } );

        //document.getElementById( 'home' ).dispatchEvent( myevent );
        window.dispatchEvent( myevent );
        
    }
    
    ngOnInit() {

        //this.productService.loadAll();

        //this.products$ = this.productService.products; // subscribe to entire collection
        this.products = this.productService.getProductsDS();
        console.log("init prodicts...");
    }

}
