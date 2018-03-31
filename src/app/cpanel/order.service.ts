import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Order } from "../cart/order";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Item } from "../cart/item";
import { ProductDatastoredService } from "../products/product-datastored.service";
import { ShippingData } from "../cart/checkout/shipping-data";
import { PaymentData } from "../cart/checkout/payment-data";

@Injectable()
export class OrderService {
    private baseUrl: string;
    private headers: HttpHeaders;

    private _orders: BehaviorSubject<Order[]>;
    private dataStore: {
        orders: Order[]
    };

    constructor( private http: HttpClient, private productService: ProductDatastoredService ) {
        this.baseUrl = 'php/orders.php';  // URL to web api
        this.headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

        this.dataStore = { orders: [] };
        this._orders = <BehaviorSubject<Order[]>>new BehaviorSubject( [] );
    }

    get orders(): Observable<Order[]> {
        return this._orders.asObservable();
    }
    
    loadAll() {
        this.http.get<Order[]>( `${this.baseUrl}/read` ).subscribe( data => {
            console.log( 'ORDERS', data );
            const orders: Order[] = [];

            data.forEach(( o, i ) => {
                const order = this.deserializeOrder( o );
                orders.push( order );
            } );

            this.dataStore.orders = orders;
            this._orders.next( Object.assign( {}, this.dataStore ).orders );

        }, error => console.log( 'Could not load orders' ) );

    }
    
    load( id: number | string ) {
        this.http.get( `${this.baseUrl}/read/${id}` ).subscribe( data => {
            let notFound = true;
            const order: Order = this.deserializeOrder( data );

            this.dataStore.orders.forEach(( item, index ) => {
                if ( item.id === order.id ) {
                    this.dataStore.orders[index] = order;
                    notFound = false;
                }
            } );

            if ( notFound ) {
                this.dataStore.orders.push( order );
            }

            this._orders.next( Object.assign( {}, this.dataStore ).orders );
        }, error => console.log( 'Could not load order.' ) );
    }
    
    private deserializeOrder( data: any ): Order {
        const order = new Order();
        //console.log( 'single order please', data );
        data.items.forEach(( itemDTO, index ) => {
            const item = new Item( this.productService.getProductById( itemDTO.product_id ), itemDTO.quantity );
            order.addItem( item );
        } );

        order.id = data.id;
        order.status = data.status;
        order.created = data.created;

        order.shippingData = new ShippingData( data.name, data.phone );
        order.shippingData.address = data.address;
        order.shippingData.email = data.email;
        order.shippingData.wantInvoice = data.wantInvoice === "1";
        order.shippingData.invoiceInfo = data.invoiceInfo;

        order.paymentData = new PaymentData();
        order.paymentData.methodOfPayment = data.methodOfPayment;

        return order;
    }

}
