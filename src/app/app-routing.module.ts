import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from "./products/products.component";
import { AppComponent } from "./app.component";
import { ProductComponent } from "./products/product.component";

const routes: Routes = [
  //{ path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
