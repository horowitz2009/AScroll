export class Product {

    id: number;
    name: string;

    categoryId: number;


    shortDesc: string;
    longDesc: string;
    image: string;

    images: string[];

    price: number;
    currency: string;
    adjustment: number;

    published: boolean;
    published2: boolean;
    
    additionalAttributes: any;
    createdOn: string;
    detailed: boolean;

    getPriceAdjusted(): number {
        return this.price * (1 - this.adjustment);
    }

}
