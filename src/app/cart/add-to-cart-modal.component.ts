import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap";
import { Product } from "../products/product";
import { Cart } from "./cart";
//import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal.service';

@Component( {
    selector: 'app-add-to-cart-modal',
    templateUrl: './add-to-cart-modal.component.html',
    styles: [`
      .modal-header {
        padding: 5px 10px;
      }
      .modal-title {
        color: white;
      }
    
    `],
    
    encapsulation: ViewEncapsulation.None
} )
export class AddToCartModalComponent implements OnInit {

    title: string;
    list: any[] = [];
    product: Product;
    cart: Cart;

    constructor( public bsModalRef: BsModalRef ) { }

    ngOnInit() {
    }

}
