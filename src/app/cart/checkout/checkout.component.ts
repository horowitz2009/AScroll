import { Component, OnInit } from '@angular/core';
import { CheckoutModel } from './checkout-model';
import { CartService } from "../cart.service";
import { Cart } from "../cart";

@Component( {
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
} )
export class CheckoutComponent implements OnInit {

    model = new CheckoutModel("", "");
    submitted = false;
    
    cart: Cart;
    constructor( private cartService: CartService ) { }

    ngOnInit() {
        this.cart = this.cartService.getCart();
    }

    onSubmit() {
        this.submitted = false;
        console.log("WE'RE DONE HERE!");
    }
    
    get diagnostic() {
        return JSON.stringify(this.model);
    }

}
