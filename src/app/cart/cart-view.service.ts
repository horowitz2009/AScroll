import { Injectable } from '@angular/core';
import { CartService } from "./cart.service";
import { Product } from "../products/product";
import { AddToCartModalComponent } from "./add-to-cart-modal.component";
import { BsModalService } from "ngx-bootstrap";

@Injectable()
export class CartViewService {

  constructor(private cartService: CartService, private modalService: BsModalService) { }

  addToCartAndOpenModal(product: Product, quantity: number = 1) {
      this.cartService.addToCart(product, quantity);
      this.openModal(product, quantity);
  }
  
  openModal(product: Product, quantity: number = 1) {
      console.log('open modal please');
      
      const bsModalRef = this.modalService.show(AddToCartModalComponent); // for bigger modal: , { class: 'gray modal-lg' }
      bsModalRef.content.title = 'You have added ' + product.name;
      bsModalRef.content.product = product;
      bsModalRef.content.cart = this.cartService.getCart();
      
      /*        console.log( "open modal for " + this.product.name);
        const list = [
                      'Open a modal with component',
                      'Pass your data',
                      'Do something else',
                      '...'
                    ];
                    this.bsModalRef = this.modalService.show(AddToCartModalComponent);
                    this.bsModalRef.content.title = 'You have added ' + this.product.name;
                    this.bsModalRef.content.list = list;
//                    setTimeout(() => {
//                      list.push('PROFIT!!!');
//                    }, 2000);
        
*/
  }
}
