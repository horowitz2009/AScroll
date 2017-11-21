import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from "./cart.service";
import { Cart } from "./cart";

@Component( {
    selector: 'app-cart-view',
    templateUrl: './cart-view.component.html',
    styleUrls: ['./cart-view.component.scss'],
    encapsulation: ViewEncapsulation.None
} )
export class CartViewComponent implements OnInit {

    cart: Cart;
    constructor( private cartService: CartService ) { }

    ngOnInit() {
        this.cart = this.cartService.getCart();
    }

}
