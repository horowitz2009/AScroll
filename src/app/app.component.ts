import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ProductDatastoredService } from "./products/product-datastored.service";
import { CookieService } from 'ngx-cookie-service';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
} )
export class AppComponent implements AfterViewInit, OnInit {
    title = 'app';

    cookieValue = 'UNKNOWN';

    constructor( private cookieService: CookieService ) { }


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
            this.cookieService.set( 'Test', '1' , 14);
            this.cookieValue = this.cookieService.get( 'Test' );
        }
    }
}


export function startupServiceFactory( productService: ProductDatastoredService ): Function {
    console.log( 'productService', productService );
    return () => {
        console.log( "startup is working..." );
        return productService.loadAll();
    }; // => required, otherwise `this` won't work inside StartupService::load
}
