import { Component, AfterViewInit, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ProductDatastoredService } from "./products/product-datastored.service";
import { CartService } from "./cart/cart.service";
import { UserService } from "./auth/user.service";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs/Observable";
import { LanguageService } from "./language.service";

import 'rxjs/add/operator/concat';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
} )
export class AppComponent implements AfterViewInit, OnInit {
    title = 'app';

    cookieValue = 'UNKNOWN';
    testt = '';
    mylang = navigator.language || 'bg';
    userLanguages: string[];
    //langs: any;
    myLocale: string;

    orders = {};

    constructor( @Inject( LOCALE_ID ) private locale: string, private cookieService: CookieService,
        private cartService: CartService,
        private languageService: LanguageService,
        private userService: UserService ) {
        this.myLocale = locale;
    }


    registerNewUser() {
        console.log( "boo" );
        this.userService.registerNewUser( "zhristov@gmail.com", "gogaasha", "Jeff" );
    }

    login( username: string ) {
        console.log( "login", username );
        this.userService.login( username, "gogaasha" );
    }

    ngAfterViewInit() {
        console.log( "after view app component..." );
        //this.stickHeader();
        //this.smoothScrolling();
        const myevent = new CustomEvent( 'smoothscroll', { detail: 'fuck you again' } );

        //document.getElementById( 'home' ).dispatchEvent( myevent );
        window.dispatchEvent( myevent );

    }

    ngOnInit() {
        //this.cookieService.deleteAll();
        if ( this.cookieService.get( 'Test' ) ) {
            this.cookieValue = this.cookieService.get( 'Test' );
            this.cookieValue = '' + ( parseInt( '' + this.cookieValue, 10 ) + 1 );
            this.cookieService.set( 'Test', this.cookieValue, 14 );
        } else {
            this.cookieService.set( 'Test', '1', 14 );
            this.cookieValue = this.cookieService.get( 'Test' );
        }

        this.languageService.userLanguages.subscribe(( langs ) => {
            console.log( "LANGUAGES", langs );
            console.log( 'LOCALE3', this.locale );
            this.userLanguages = langs;
        } );

        //this.languageService.detectUserLanguages();

    }
}


export function startupServiceFactory( langService: LanguageService, productService: ProductDatastoredService, cartService: CartService ): Function {
    //console.log( 'productService', productService );
    return () => {
        console.log( "INITIALIZE..." );

        return langService.loadUserLanguages().
            concat( productService.loadAll(), cartService.loadCart() )
            .toPromise();
      
    };
}
