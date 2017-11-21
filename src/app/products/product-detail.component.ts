import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Product } from "./product";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AddToCartModalComponent } from "../cart/add-to-cart-modal.component";
import { CartService } from "../cart/cart.service";
import { CartViewService } from "../cart/cart-view.service";

@Component( {
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
} )
export class ProductDetailComponent implements OnInit {
    @Input() product: Product;
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService, private cartService: CartViewService) {}

    public openAddToCartModal() {
        this.cartService.addToCartAndOpenModal(this.product, 1);
    }

    ngOnInit() {

    }

}
