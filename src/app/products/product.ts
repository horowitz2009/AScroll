export class Product {

    id: number;
    name: string;

    categoryId: number;


    shortDescription: string;
    longDescription: string;

    images: string[];

    price: number;
    currency: string;
    discount: number;

    published: boolean;
    published2: boolean;
    
    additionalAttributes: any;
    createdOn: string;
}
