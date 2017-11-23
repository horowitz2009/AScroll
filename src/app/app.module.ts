import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, VERSION, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent, startupServiceFactory } from './app.component';
import { NavComponent } from './nav.component';
import { AboutComponent } from './front/about.component';
import { ContactComponent } from './front/contact.component';
import { FooterComponent } from './footer.component';
import { ProductsComponent } from './products/products.component';

import { ProductDatastoredService } from './products/product-datastored.service';

import { KeepHtmlPipe } from './keephtml/keep-html.pipe';
import { RestComponent } from './rest/rest.component';
import { AppRoutingModule } from "./app-routing.module";
import { ProductComponent } from './products/product.component';
import { FrontComponent } from './front/front.component';
import { BannerComponent } from './front/banner.component';

import { NgxGalleryModule } from 'ngx-gallery';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { ProductDetailComponent } from './products/product-detail.component';
import { MagnificPopupDirective } from './directives/magnific-popup.directive';
import { CartViewComponent } from './cart/cart-view.component';
import { CartService } from "./cart/cart.service";
import { AddToCartModalComponent } from './cart/add-to-cart-modal.component';
import { CartViewService } from "./cart/cart-view.service";
import { OnlyNumberDirective } from './directives/only-number.directive';
import { EmailOptionalValidatorDirective } from "./directives/email-optional-validator.directive";
import { CheckoutComponent } from "./cart/checkout/checkout.component";

export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'pinch': { enable: false },
        'rotate': { enable: false }
    };
}

@NgModule( {
    declarations: [
        AppComponent,
        KeepHtmlPipe,

        AddToCartModalComponent,
        NavComponent,
        ProductsComponent,
        AboutComponent,
        ContactComponent,
        FooterComponent,

        RestComponent,
        ProductComponent,
        FrontComponent,
        BannerComponent,
        ProductDetailComponent,
        MagnificPopupDirective,
        EmailOptionalValidatorDirective,
        CartViewComponent,
        OnlyNumberDirective,
        CheckoutComponent

    ],
    entryComponents: [AddToCartModalComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgxGalleryModule,
        ModalModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        ProductDatastoredService,
        CartService,
        CartViewService,
        {
            provide: APP_INITIALIZER,
            useFactory: startupServiceFactory,
            deps: [ProductDatastoredService],
            multi: true
        },
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        }
    ],
    bootstrap: [AppComponent]
} )
export class AppModule { }
