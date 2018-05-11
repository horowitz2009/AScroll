import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { BsModalService } from "ngx-bootstrap";
import { CartViewService } from "../cart/cart-view.service";
import { Product } from "../products/product";
import { ProductDatastoredService } from "../products/product-datastored.service";
import { ImageItem } from "../products/image-item";
import { Order } from "../cart/order";
import { CartService } from "../cart/cart.service";
import { OrderService } from "./order.service";
import { MailService } from "./mail.service";
import { map } from "rxjs/operator/map";
import { filter } from "rxjs/operator/filter";

@Component( {
    selector: 'app-order-admin',
    templateUrl: './order-admin.component.html',
    styles: [`
      ngx-gallery .ngx-gallery-icon {
        font-size: 50px !important;
      }
      
      ngx-gallery ngx-gallery-thumbnails .ngx-gallery-icon {
        font-size: 40px !important;
      }
      
      ngx-gallery ngx-gallery-image ngx-gallery-arrows .ngx-gallery-arrow-wrapper { 
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.16) 100%) !important;
        width: 9% !important;
      }
      
      ngx-gallery ngx-gallery-image ngx-gallery-arrows .ngx-gallery-arrow-wrapper.ngx-gallery-arrow-left { 
        background: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.16) 100%) !important;
        width: 9% !important;
      }
      
      ngx-gallery ngx-gallery-thumbnails ngx-gallery-arrows .ngx-gallery-arrow-wrapper { 
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.16) 100%) !important;
        width: 6% !important;
      }
      
      ngx-gallery ngx-gallery-thumbnails ngx-gallery-arrows .ngx-gallery-arrow-wrapper.ngx-gallery-arrow-left { 
        background: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.16) 100%) !important;
        width: 6% !important;
      }
      
      pre {
      border:none;
      }
      
      .cart .quantity {
    width: 20%;
    font-size: 14px;
    white-space: nowrap;
    text-align: center;
}
             
    `
    ],
    encapsulation: ViewEncapsulation.None
} )
export class OrderAdminComponent implements OnInit {

    order: Order;
    editMode: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductDatastoredService,
        private modalService: BsModalService, private orderService: OrderService,
        private mailService: MailService
    ) { }

    setStatus( status: string ) {
        this.order.status = status;
    }

    sendMail() {
        this.mailService.sendMail3( { "email": "zhristov@gmail.com", "message": "Благодарим за направената поръчка!" } );
    }
    
    
    
    save() {
        // todo save order
        // this.cartService.saveCart();
        this.editMode = false;
        this.orderService.updateShippingData(this.order);
    }

    ngOnInit() {
        console.log( "init single order" );
        this.route.paramMap.subscribe(
            ( params: ParamMap ) => {
                this.orderService.orders.subscribe( orders => {
                    console.log( "damn" );
                    this.order = orders.find( o => +o.id === +params.get( 'id' ) );
                    this.editMode = false;
                } );
                this.orderService.load( params.get( 'id' ) );
                //this.order = this.cartService.getOrderById( params.get( 'id' ) );
            }
        );


    }



}
