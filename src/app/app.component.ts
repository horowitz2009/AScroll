import { Component } from '@angular/core';
import { ProductDatastoredService } from "./products/product-datastored.service";

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
} )
export class AppComponent {
    title = 'app';
}

export function startupServiceFactory( productService: ProductDatastoredService ): Function {
    console.log( 'productService', productService );
    return () => {
        console.log( "startup is working..." );
        return productService.loadAll();
    }; // => required, otherwise `this` won't work inside StartupService::load
}
