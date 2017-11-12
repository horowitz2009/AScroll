import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, VERSION, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent, startupServiceFactory } from './app.component';
import { NavComponent } from './nav.component';
import { AboutComponent } from './front/about.component';
import { ContactComponent } from './front/contact.component';
import { FooterComponent } from './footer.component';
import { ProductsComponent } from './products/products.component';

import { ProductService } from './products/product.service';
import { ProductDatastoredService } from './products/product-datastored.service';

import { KeepHtmlPipe } from './keephtml/keep-html.pipe';
import { RestComponent } from './rest/rest.component';
import { AppRoutingModule } from "./app-routing.module";
import { ProductComponent } from './products/product.component';
import { FrontComponent } from './front/front.component';
import { BannerComponent } from './front/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    KeepHtmlPipe,
    
    NavComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,

    RestComponent,
    
    ProductComponent,
    
    FrontComponent,
    
    BannerComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    
    AppRoutingModule
  ],
  providers: [
              ProductService, 
              ProductDatastoredService,
              {
                  provide: APP_INITIALIZER,
                  useFactory: startupServiceFactory,
                  deps: [ProductDatastoredService],
                  multi: true
                }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
