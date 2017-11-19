import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Product } from "./product";

@Component( {
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
} )
export class ProductDetailComponent implements OnInit {
    @Input() product: Product;

    constructor() { }


    ngOnInit() {

    }

}
