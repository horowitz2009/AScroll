import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductDatastoredService } from "./product-datastored.service";
import { Product } from '../products/product';
import { Observable } from "rxjs/Observable";
import { Router, NavigationEnd } from "@angular/router";

@Component( {
    selector: 'app-products',
    templateUrl: './products.component.html',
    styles: []
} )
export class ProductsComponent implements OnInit, AfterViewInit {






    constructor( private productService: ProductDatastoredService, private router: Router ) {
//        router.events.subscribe(( val ) => {
//            console.log( val );
//            console.log( 'boohoo ', val instanceof NavigationEnd );
//        } );
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

    ngAfterViewInit() {
        console.log( "after view products..." );

        const myevent = new CustomEvent( 'mycustomevent', { detail: 'fuck you' } );

        //document.getElementById( 'home' ).dispatchEvent( myevent );
        window.dispatchEvent( myevent );

    }

    ngOnInit() {

        //this.productService.loadAll();

        //this.products$ = this.productService.products; // subscribe to entire collection
        this.products = this.productService.getProductsDS();
        console.log( "init products..." );
    }

}
