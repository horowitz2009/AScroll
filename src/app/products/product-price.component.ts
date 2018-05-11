import { Component, OnInit, Input } from '@angular/core';

@Component( {
    selector: 'app-product-price',
    template: `
    {{this.price1}}<sup>{{this.price2|number:'2.0-0'}}</sup>
  `,
    styles: []
} )
export class ProductPriceComponent implements OnInit {
    @Input() price: number;
    price1: number;
    price2: number;
    constructor() { }

    ngOnInit() {
        const p = this.price;
        this.price1 = Math.floor(p);
        this.price2 = (p - this.price1) * 100;
    }

}
