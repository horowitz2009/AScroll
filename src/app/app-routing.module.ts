import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from "./products/products.component";
import { AppComponent } from "./app.component";
import { ProductComponent } from "./products/product.component";
import { FrontComponent } from "./front/front.component";
import { CartViewComponent } from "./cart/cart-view.component";
import { CheckoutComponent } from "./cart/checkout/checkout.component";
import { CheckoutFinalComponent } from "./cart/checkout/checkout-final.component";
import { LoginComponent } from "./auth/login.component";
import { ControlPanelComponent } from "./cpanel/control-panel.component";
import { AuthGuard } from "./auth/auth.guard";
import { OrdersComponent } from "./cpanel/orders.component";
import { ProductAdminComponent } from "./cpanel/product-admin.component";
import { OrderAdminComponent } from "./cpanel/order-admin.component";

const routes: Routes = [
  { path: '', redirectTo: '/front', pathMatch: 'full' },
  { path: 'front', component: FrontComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'mycart', component: CartViewComponent }, //, canActivate: [CartGuard]
  { path: 'checkout/shipping', component: CheckoutComponent },
  { path: 'checkout/finalize', component: CheckoutFinalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cpanel/orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'cpanel/order/:id', component: OrderAdminComponent, canActivate: [AuthGuard] },
  { path: 'cpanel/products', component: ControlPanelComponent, canActivate: [AuthGuard] },
  { path: 'cpanel/product/:id', component: ProductAdminComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
