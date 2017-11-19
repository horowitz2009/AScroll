import { Product } from "../products/product";

export class Item {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
    
    getSubTotal(): number {
        return this.product.price * this.quantity;
    }

}
