import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from "../cart.service";
import { Order } from "../order";
import { Router } from "@angular/router";

@Component({
  selector: 'app-checkout-final',
  templateUrl: './checkout-final.component.html',
  styleUrls: ['./checkout-final.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutFinalComponent implements OnInit {

  order: Order;

  getStatus(): string {
      const st = this.order.status;
      let s = 'Обработва се';
      if (st === "pending") {
          s = 'Обработва се';
      } else if (st === "waitingPayment") {
          s = "Очаква плащане";
      } //TODO rest of statuses
      return s;
  }
  
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.order = this.cartService.getOrder();
    if (this.order.getCount() === 0) {
        this.router.navigate( ['/front'] );
    }
  }

}
