import { Component, OnInit } from '@angular/core';
import { Order } from "../cart/order";
import { MailService } from "./mail.service";
import { OrderService } from "./order.service";
import { Observable } from "rxjs/Observable";

@Component( {
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styles: [`
    .ready {
      transition: all 1s;
      color: inherit;
      min-height: 550px;
    }
    .loading {
      color: white;
      min-height: 550px;
    }
    
    
    .orders.table .checkboxColumn
    .orders.table .id,
    .orders.table .amount {
      width: 5%;
      text-align: right;
    }

    .orders.table .status,
    .orders.table .created {
      width: 15%;
    }
    
    .orders.table .user {
      width: 25%;
    }
    
    .orders.table .address {
      width: 35%;
    }

    .big-checkbox {
      width: 16px; 
      height: 16px;
    }
    
  

     a.dropdown-item:not([href]) {
       color: inherit;
       transition: 0.2s;
       cursor: pointer;
     }

     a.dropdown-item:hover:not([href]), a:active:not([href]), a:focus:not([href]) {
       color: lighten(#138496, 0.5%);
       outline: none;
       text-decoration: none;
       cursor: pointer;
     }
     
     .dropdown-item:hover, .dropdown-item:focus {
       color: #16181b;
       text-decoration: none;
       background-color: #676767;
     }
   
     .btn-dark:not(:disabled):not(.disabled):active:focus, .btn-dark:not(:disabled):not(.disabled).active:focus, .show > .btn-dark.dropdown-toggle:focus {
       -webkit-box-shadow: 0 0 0 0 #ffffff;
       box-shadow: 0 0 0 0 #ffffff;
     }
    
    `]
} )
export class OrdersComponent implements OnInit {
    //orders$: Observable<Order[]>;
    orders: Order[];
    constructor( private orderService: OrderService, private mailService: MailService ) { }
    ready = false;

    refresh() {
        console.log( "refresh" );
        this.ready = false;
        //this.orders = [];

        //setTimeout(() => { this.ready = true; }, 500 );

        this.orderService.orders.subscribe( orders => {
            this.orders = orders;
            this.ready = true;
        } );
        
        this.orderService.loadAll();
    }

    sendMail() {
        this.mailService.sendMail( { "email": "zhristov@gmail.com", "message": "Благодарим за направената поръчка!" } );
    }

    setStatus( status: string ) {
        const ordersToUpdate: number[] = [];
        this.orders.filter( o => o.selected ).forEach( o => {
            o.status = status;
            o.selected = false;
            ordersToUpdate.push( o.id );
        } );
        //this.cartService.updateOrderStatuses( status, ordersToUpdate );
    }

    ngOnInit() {

        this.refresh();

    }

}
