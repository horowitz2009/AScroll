import { Component, AfterViewInit } from '@angular/core';
import { ProductDatastoredService } from "./products/product-datastored.service";

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
} )
export class AppComponent implements AfterViewInit {
    title = 'app';

    ngAfterViewInit() {
        console.log( "after view app component..." );
        //this.stickHeader();
        //this.smoothScrolling();
        const myevent = new CustomEvent( 'smoothscroll', { detail: 'fuck you again' } );

        //document.getElementById( 'home' ).dispatchEvent( myevent );
        window.dispatchEvent( myevent );

    }

}

export function startupServiceFactory( productService: ProductDatastoredService ): Function {
    console.log( 'productService', productService );
    return () => {
        console.log( "startup is working..." );
        return productService.loadAll();
    }; // => required, otherwise `this` won't work inside StartupService::load
}
