import { Injectable } from '@angular/core';
import { Cart } from "./cart";

@Injectable()
export class CartService {
    
    private _cart: Cart;

    constructor() {
        this._cart = new Cart();
        console.log("CART SERVICE created");
    }

    getCart(): Cart {
        return this._cart;
    }

}
