import { Item } from "./item";

export class Cart {
    id: number;
    items: Item[];

    constructor() {
        this.items = [];
    }

    getItems(): Item[] {
        return this.items;
    }

    getShipping(): number {
        return 3.99;
    }

    getSubTotal(): number {
        let sum = 0;
        for ( let index = 0; index < this.items.length; index++ ) {
            sum += this.items[index].getSubTotal();
        }

        return sum;
    }

    getTotal(): number {
        return this.getShipping() + this.getSubTotal();
    }

    getCount(): number {
        let cnt = 0;
        for ( let index = 0; index < this.items.length; index++ ) {
            const v = parseInt( '' + this.items[index].quantity, 10 );
            if ( !isNaN( v ) ) {
                cnt += v;
            }
        }
        return cnt;
    }

    addItem( item: Item ) {
        const found = this.items.find( it => it.product.id === item.product.id );
        console.log( "FOUND", found );
        if ( found ) {
            found.quantity += item.quantity;
        } else {
            this.items.push( item );
        }
    }
}
