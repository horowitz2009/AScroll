import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from "./cart.service";
import { Cart } from "./cart";
import { Item } from "./item";
import { Router } from "@angular/router";

@Component( {
    selector: 'app-cart-view',
    templateUrl: './cart-view.component.html',
    styleUrls: ['./cart-view.component.scss'],
    encapsulation: ViewEncapsulation.None
} )
export class CartViewComponent implements OnInit {

    cart: Cart;
    constructor( private router: Router, private cartService: CartService ) { }


    dec( item: Item ) {
        //console.log("dec", item.quantity );
        let v = parseInt( '' + item.quantity, 10 );
        if ( isNaN( v ) ) {
            v = 1;
        }
        if ( v > 1 ) {
            item.quantity = v - 1;
        }
    }

    inc( item: Item ) {
        //console.log("inc", item.quantity );
        let v = parseInt( '' + item.quantity, 10 );
        if ( isNaN( v ) ) {
            v = 1;
            return;
        }
        if ( v < 99 ) {
            item.quantity = v + 1;
        }
    }

    remove( item: Item ) {

        this.cartService.removeItem( item );
        //console.log("inc", item.quantity );
        let v = parseInt( '' + item.quantity, 10 );
        if ( isNaN( v ) ) {
            v = 1;
            return;
        }
        if ( v < 99 ) {
            item.quantity = v + 1;
        }
    }

    checkout() {
        this.cartService.saveCart();
        this.router.navigate( ['/checkout/shipping'] );
    }


    ngOnInit() {
        this.cartService.cartObs.subscribe( cart => {
            console.log( "view CART LOADED", cart );
            this.cart = cart;
        } );


    }

}
