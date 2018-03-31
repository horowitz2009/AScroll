import { ProductDatastoredService } from "../products/product-datastored.service";
import { Product } from "../products/product";
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Router, NavigationEnd } from "@angular/router";

@Component( {
    selector: 'app-products2',
    templateUrl: './products.component.html',
    styles: []
} )
export class Products2Component implements OnInit {
    constructor( private productService: ProductDatastoredService, private router: Router ) {
    }


    products: Product[];
    //products$: Observable<Product[]> = undefined;

    transform( product: Product ) {
        if ( product.detailed ) {
            product.detailed = false;
        } else {
            product.detailed = true;
        }
        console.log( product );
    }

    
    getAdditionalAsJson(product: Product): string {
        return JSON.stringify(product.additionalAttributes, null, ' ');
    }

    ngAfterViewInit() {
        this.productService.products.subscribe(() => {
            window.dispatchEvent( new CustomEvent( 'magnific-popup', { detail: 'products' } ) );
        } );
    }

    ngOnInit() {

        //this.products$ = this.productService.products; // subscribe to entire collection
        this.productService.products.subscribe(( products ) => {
            this.products = products;
        } );

    }

}
