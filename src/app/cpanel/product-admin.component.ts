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

@Component( {
    selector: 'app-product-admin',
    templateUrl: './product-admin.component.html',
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
             
      .product-form label {
          font-weight: 700;
      }
    `
    ],
    encapsulation: ViewEncapsulation.None
} )
export class ProductAdminComponent implements OnInit {

    //product$: Observable<Product>;
    oproduct: Product;
    product: Product;
    productAdditional: string;
    jsonError: string;
    state: string;
    copy: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductDatastoredService,
        private modalService: BsModalService, private cartService: CartViewService
    ) { }

    applyAdditional() {
        try {
            const obj = JSON.parse( this.productAdditional );
            this.product.additionalAttributes = obj;
            this.jsonError = '';
            this.state = 'ok' + new Date();
            console.log( "STATE", this.state );
        } catch ( e ) {
            this.jsonError = '' + e;
            this.state = 'ko';
        }
    }

    saveProduct() {
        if ( this.copy ) {
            this.product.id = null;
            this.productService.create( this.product );

        } else {
            this.productService.update( this.product );
        }
        this.copy = false;
    }

    cloneProduct() {
        this.product = this.product.clone();
        this.copy = true;
        this.product.name = this.product.name + " copy";
    }


    ngOnInit() {
        this.route.paramMap.subscribe(
            ( params: ParamMap ) => {
                this.oproduct = this.productService.getProductById( params.get( 'id' ) );
                this.product = this.oproduct.clone();
                this.productAdditional = JSON.stringify( this.product.additionalAttributes );
                this.jsonError = '';
            }
        );


    }



}
