import { Component, AfterViewInit, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ProductDatastoredService } from "./products/product-datastored.service";
import { CartService } from "./cart/cart.service";
import { UserService } from "./auth/user.service";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs/Observable";
import { LanguageService } from "./language.service";
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

//        this.cartService.cartObs.subscribe( cart => {
//            console.log( "main CART LOADED", cart );
//            if ( cart ) {
//                //this.cartService.getLang();
//                //this.langs = this.cartService.lang;
//                //this.mylang = this.langs[0] || 'bg';
//                console.log( 'LOCALE2', this.mylang2 );
//            }
//        } );
        
        this.languageService.userLanguages.subscribe((langs) => {
            console.log("LANGUAGES", langs);
                console.log( 'LOCALE3', this.locale );
            this.userLanguages = langs;
        });

        this.languageService.detectUserLanguages();

    }
}


export function startupServiceFactory( productService: ProductDatastoredService, cartService: CartService ): Function {
    //console.log( 'productService', productService );
    return () => {
        console.log( "INITIALIZE..." );

//        const ob1 = productService.products;
//        const ob2 = ob1.flatMap( res1 => {
//            console.log("res1", res1);
//            return cartService.cartObs;
//        } );
//        ob2.subscribe(() => {
//            return ob2.toPromise();
//        });

        return productService.loadAll().then(ppp => {
          console.log("PRODUCTS REALLY LOADED", ppp);
          return cartService.loadSimple();
            
        });
//        .subscribe(cart => {
//          return ob2.toPromise();
//        });
        //return cartService.loadSimple().toPromise();

        //cartService.loadSimple();
        // productService.products.flatMap (result1 => {
        //    return cartService.loadSimple();
        //});


        //        return productService.loadAll().then(() => {
        //            console.log("what now....");
        //            cartService.loadSimple();
        //        } );
    }; // => required, otherwise `this` won't work inside StartupService::load
}

export function startupServiceFactory2( productService: ProductDatastoredService, cartService: CartService ): Function {
    //    return new Promise(( resolve, reject ) => {
    //        productService.products.skipWhile( products => !products )
    //            .subscribe(() => {
    //                console.log( "GAMMMSASA" );
    //            } );
    //
    //    } );

    //    const p = new Promise ((resolve, reject) => {
    //        productService.products.skipWhile(products => !products);
    //    });


    /**
     * 
     * 
     * 
     * var zippedSequence = Observable.When(
 one.And(two)
 .And(three)
 .Then((first, second, third) => 
 new { 
 One = first, 
 Two = second, 
 Three = third 
 })
 );
 zippedSequence.Subscribe(
 Console.WriteLine,
 () => Console.WriteLine("Completed"));
     */

    //    
    //    
    //    const ppp = productService.loadAll2().and(
    //            cartService.loadSimple);
    //           console.log(ppp); 
    //            
    //            
    //            , (a, b) => {
    //                console.log("CRAZY", a, b);
    //            }).toPromise();
    //    

    //  source.subscribe();
    //return source.toPromise();
    //    return new Promise<any>(
    //        ( resolve, reject ) => {
    //            productService.products.skipWhile( products => !products )
    //
    //                
    //                .subscribe((hmm) => {
    //                    cartService.loadSimple();
    //                });
    //        }
    //
    //    );
    //


    return () => {
        console.log( "executing second factory..." );
        return cartService.loadSimple();
    }; // => required, otherwise `this` won't work inside StartupService::load
}
