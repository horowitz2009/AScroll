import { Injectable } from '@angular/core';
import { Cart } from "./cart";
import { Product } from "../products/product";
import { Item } from "./item";

@Injectable()
export class CartService {

    private _cart: Cart;

    constructor() {
        this._cart = new Cart();
        console.log( "CART SERVICE created" );
    }

    getCart(): Cart {
        return this._cart;
    }

    addToCart( product: Product, quantity: number = 1 ) {
        const item = new Item( product, quantity );
        this._cart.addItem( item );
    }

}
