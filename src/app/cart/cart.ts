import { Item } from "./item";
import { ShippingData } from "./checkout/shipping-data";
import { PaymentData } from "./checkout/payment-data";

export class Cart {
    id: number;
    items: Item[];

    shippingData: ShippingData;
    paymentData: PaymentData;

    constructor() {
        this.items = [];
        this.shippingData = new ShippingData( '', '' );
        this.paymentData = new PaymentData();
    }

    getItems(): Item[] {
        return this.items;
    }

    getShipping(): number {
        return 3.90;
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
        //console.log( "FOUND", found );
        if ( found ) {
            found.quantity = parseInt( '' + found.quantity, 10 ) + item.quantity;
        } else {
            this.items.push( item );
        }
    }

    removeItem( item: Item ) {
        const index = this.items.findIndex( it => it.product.id === item.product.id );
        if ( index > -1 ) {
            this.items.splice( index, 1 );
        }
    }

    clear() {
        this.id = null;
        this.items.splice( 0, this.items.length );
        this.shippingData.clear();
        this.paymentData.clear();
    }

    clone(): Cart {
        const copy = new Cart();
        //$.extend(true, copy, this);
        copy.items = this.items.slice(0, this.items.length);
        copy.shippingData = new ShippingData('', '');
        copy.shippingData.load(this.shippingData);
        copy.paymentData = new PaymentData();
        copy.paymentData.load(this.paymentData);
        return copy;
    }
}
