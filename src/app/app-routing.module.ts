import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from "./products/products.component";
import { AppComponent } from "./app.component";
import { ProductComponent } from "./products/product.component";
import { FrontComponent } from "./front/front.component";
import { CartViewComponent } from "./cart/cart-view.component";
import { CheckoutComponent } from "./cart/checkout/checkout.component";

const routes: Routes = [
  { path: '', redirectTo: '/front', pathMatch: 'full' },
  { path: 'front', component: FrontComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartViewComponent },
  { path: 'checkout', component: CheckoutComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
