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
    discount: number;

    published: boolean;
    published2: boolean;
    
    additionalAttributes: any;
    createdOn: string;
    detailed: boolean;
}
