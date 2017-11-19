import { Item } from "./item";

export class Cart {
    id: number;
    items: Item[];

    constructor() {
        this.items = [];
    }

    getTotal(): number {
        let sum = 0;
        for ( let index = 0; index < this.items.length; index++ ) {
            sum += this.items[index].getSubTotal();
        }

        return sum;
    }
}
