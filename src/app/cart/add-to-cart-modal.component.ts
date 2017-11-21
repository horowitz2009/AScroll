import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap";
import { Product } from "../products/product";
import { Cart } from "./cart";
//import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal.service';

@Component( {
    selector: 'app-add-to-cart-modal',
    template: 
    `
    <div class="modal-header">
        <h6 class="modal-title">Добавихте следния артикул</h6>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div *ngIf="product" class="container">
          <!-- product -->  
          <div class="row">
            <div class="col-5">
              <a (click)="bsModalRef.hide()" [routerLink]="['/product', product.id]"><img [src]="product.image" alt="" ></a><!--style="max-height: 100px;"--> 
            </div>
            <div class="col-7" style="padding-left: 0">
              <a (click)="bsModalRef.hide()" [routerLink]="['/product', product.id]">{{product.name}}</a> <br>
              <small>{{product.shortDesc}}</small><br>
              <span class="price"> <i class="fa fa-tag" aria-hidden="true"></i> {{product.price|number:'1.2-2'}}лв</span>
            </div>
          </div>
          <!-- cart summary -->  
          <div class="row" *ngIf="cart" style="margin-top: 20px">
            <div class="col">
              
                        <table class="app-modal table table-hover ">
                          <thead>
                            <tr>
                              <th class="heading">Вашата количка</th>
                              <th class="right">{{cart.getCount()}} артикула</th>
                            </tr>
                          </thead>
                          
                          <tbody>
                            <tr>
                              <td class="sub-total-label">Сума</td>
                              <td class="amount right">{{cart.getTotal()|number:'1.2-2'}}</td>
                            </tr>
                            <tr>
                              <td class="sub-total-label">Доставка</td>
                              <td class="amount right">{{'3.99'|number:'1.2-2'}}</td>
                            </tr>
                            
                            <tr>
                              <td class="total-label">Всичко</td>
                              <td class="total-amount right">{{(cart.getTotal() + 3.99)|number:'1.2-2'}}</td>
                            </tr>
                          </tbody>
                        </table>
              
              
              
            </div>
          </div>
            
        </div>
      </div>
      <div class="modal-footer">
        <!--<button type="button" class="btn btn-primary" (click)="bsModalRef.hide()">Save changes</button>
        <button type="button" class="btn btn-secondary" (click)="bsModalRef.hide()">Close</button>
        -->
        <a (click)="bsModalRef.hide()" [routerLink]="['/cart']" class="btn btn-group btn-gray btn-sm">Покажи количка</a>
        <a (click)="bsModalRef.hide()" href="shop-checkout.html" class="btn btn-group btn-gray btn-sm">Поръчай</a>
      </div>
     
    `,

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
