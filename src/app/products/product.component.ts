import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from "./product";
import { ProductDatastoredService } from "./product-datastored.service";

@Component( {
    selector: 'app-product',
    templateUrl: './product.component.html',
    styles: []
} )
export class ProductComponent implements OnInit {

    product$: Observable<Product>;
    //product$: Product;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductDatastoredService
    ) { }

    ngOnInit() {
        this.product$ = this.route.paramMap
          .switchMap((params: ParamMap) =>
            this.service.getProduct(params.get('id')));
      }

      gotoProducts(product: Product) {
        const productId = product ? product.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        // Include a junk 'foo' property for fun.
        //this.router.navigate(['', { id: productId, foo: 'foo' }]);
        this.router.navigate(['']);
      }

}
