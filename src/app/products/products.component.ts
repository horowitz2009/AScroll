import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ProductDatastoredService } from "./product-datastored.service";
import { Product } from '../products/product';
import { Observable } from "rxjs/Observable";
import { Router, NavigationEnd } from "@angular/router";

@Component( {
    selector: 'app-products',
    templateUrl: './products.component.html',
    styles: []
} )
export class ProductsComponent implements OnInit, AfterViewInit, AfterViewChecked {

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

    ngAfterViewInit() {
        console.log( "after view products..." );

        window.dispatchEvent( new CustomEvent( 'magnific-popup', { detail: 'products' } ) );

    }

    ngAfterViewChecked() {
        console.log( 'Products afterViewChecked' );
        //magnific to be updated here
        //window.dispatchEvent( new CustomEvent( 'products-loaded' ) );
    }

    ngOnInit() {

        //this.productService.loadAll();

        //this.products$ = this.productService.products; // subscribe to entire collection
        this.products = this.productService.getProductsDS();
        console.log( "init products..." );
    }

}
