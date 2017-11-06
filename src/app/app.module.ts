import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { FooterComponent } from './footer.component';
import { ProductsComponent } from './products/products.component';

import { ProductService } from './products/product.service';
import { ProductDatastoredService } from './products/product-datastored.service';
import { ProductListComponent } from './products/product-list.component';

import { KeepHtmlPipe } from './keephtml/keep-html.pipe';
import { RestComponent } from './rest/rest.component';

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
    
    ProductListComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductService, ProductDatastoredService],
  bootstrap: [AppComponent]
})
export class AppModule { }
