export class Product {

    id: number;
    categoryId: number;

    name: string; //localize
    shortDesc: string; //localize
    longDesc: string; //localize
    price: number; //localize
    currency: string; //localize

    image: string;
    //images: string[];

    adjustment: number;

    additionalAttributes: any;

    published: boolean;
    published2: boolean;

    createdOn: string;
    detailed: boolean;

    constructor() {
        this.adjustment = 0.0;
        //this.images = [];
    }

    getPriceAdjusted(): number {
        return this.price * ( 1 - this.adjustment );
    }

    clone(): Product {
        const copy = new Product();
        $.extend(true, copy, this);
//        copy.id = this.id;
//        copy.categoryId = this.categoryId;
//
//        copy.name = this.name;
//        copy.shortDesc = this.shortDesc;
//        copy.longDesc = this.longDesc;
//        copy.price = this.price;
//        copy.currency = this.currency;
//
//        copy.image = this.image;
//        copy.images = this.images.slice( 0, this.images.length );
//
//        copy.adjustment = this.adjustment;
//
//        if ( this.additionalAttributes ) {
//            copy.additionalAttributes = JSON.parse( JSON.stringify( this.additionalAttributes ) );
//        }
        return copy;
    }


}
