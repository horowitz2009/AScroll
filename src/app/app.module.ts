import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, VERSION, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { CookieService } from 'ngx-cookie-service';

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
import { LanguageService } from "./language.service";
import { UserService } from "./auth/user.service";
import { AddToCartModalComponent } from './cart/add-to-cart-modal.component';
import { CartViewService } from "./cart/cart-view.service";
import { OnlyNumberDirective } from './directives/only-number.directive';
import { EmailOptionalValidatorDirective } from "./directives/email-optional-validator.directive";
import { CheckoutComponent } from "./cart/checkout/checkout.component";
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { CheckoutFinalComponent } from './cart/checkout/checkout-final.component';
import { DefaultPipe } from './directives/default.pipe';
import { CurrencyService } from "./currency/currency.service";
import { CurrencyConvertPipe } from "./directives/currency-convert.pipe";
import { LoginComponent } from './auth/login.component';
import { ControlPanelComponent } from './cpanel/control-panel.component';
import { AuthGuard } from "./auth/auth.guard";
import { JwtHelper } from 'angular2-jwt';
import { OrdersComponent } from './cpanel/orders.component';
import { registerLocaleData } from '@angular/common';
import localeBg from '@angular/common/locales/bg';
import localeBgExtra from '@angular/common/locales/extra/bg';
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';
import { MyCalendarPipe } from './directives/my-calendar.pipe';
import { SettingsService } from "./settings.service";
import { OrderStatusPipe } from './directives/order-status.pipe';
import { MailService } from "./cpanel/mail.service";
import { Products2Component } from "./cpanel/products.component";
import { ProductAdminComponent } from "./cpanel/product-admin.component";
import { OrderAdminComponent } from "./cpanel/order-admin.component";
import { OrderService } from "./cpanel/order.service";
import { SocialPanelComponent } from './front/social-panel.component';
import { MyPricePipe } from './directives/my-price.pipe';
import { PriceDirective } from './directives/price.directive';
import { ProductPriceComponent } from './products/product-price.component';

registerLocaleData(localeBg, 'bg', localeBgExtra);
registerLocaleData(localeEn, 'en', localeEnExtra);

//export class MyHammerConfig extends HammerGestureConfig {
//    overrides = <any>{
//        'pinch': { enable: false },
//        'rotate': { enable: false }
//    };
//}

export function getLanguage( settingsService: SettingsService ) {
    console.log("DAMN LANGUAGE SHIT");
    return settingsService.getLanguage();
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
        CheckoutComponent,
        TermsAndConditionsComponent,
        CheckoutFinalComponent,
        DefaultPipe,
        CurrencyConvertPipe,
        LoginComponent,
        ControlPanelComponent,
        OrdersComponent,
        MyCalendarPipe,
        OrderStatusPipe,
        Products2Component,
        ProductAdminComponent,
        OrderAdminComponent,
        SocialPanelComponent,
        MyPricePipe,
        PriceDirective,
        ProductPriceComponent,

    ],
    entryComponents: [AddToCartModalComponent, TermsAndConditionsComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgxGalleryModule,
        ModalModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        SettingsService,
        ProductDatastoredService,
        CookieService,
        CartService,
        LanguageService,
        CartViewService,
        OrderService,
        CurrencyService,
        {
            provide: LOCALE_ID,
            deps: [SettingsService],
            useFactory: getLanguage
        },
        {
            provide: APP_INITIALIZER,
            useFactory: startupServiceFactory,
            deps: [LanguageService, ProductDatastoredService, CartService],
            multi: true
        },
//                {
//                    provide: APP_INITIALIZER,
//                    useFactory: startupServiceFactory2,
//                    deps: [ProductDatastoredService, CartService],
//                    multi: true
//                },
        //        {
        //            provide: HAMMER_GESTURE_CONFIG,
        //            useClass: MyHammerConfig
        //        },

        UserService,
        AuthGuard,
        JwtHelper,
        MailService

    ],
    bootstrap: [AppComponent]
} )
export class AppModule { }


