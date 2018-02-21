import { Component, OnInit, AfterViewChecked } from '@angular/core';

import * as $ from 'jquery';
import { ActivatedRoute, Router, ParamMap, Params, NavigationEnd } from "@angular/router";
import { Cart } from "./cart/cart";
import { CartService } from "./cart/cart.service";

@Component( {
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styles: []
} )
export class NavComponent implements OnInit, AfterViewChecked {

    // this.router.navigate( [ '/my-app-route' ], { fragment: prodID } );
    cart: Cart;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService
    ) {
    }


    //<a routerLink="/my-link" [class.active]="isLinkActive('/my-link')"></a>
    public isLinkActive( fragment: string ): boolean {
        return this.route.snapshot.fragment === fragment;
    }

    scrollTo( anchor: string ) {
        const myevent = new CustomEvent( 'my-navigation-end', { detail: anchor } );
        window.dispatchEvent( myevent );
    }

    ngAfterViewChecked() {

    }

    ngOnInit() {
        
        this.cart = this.cartService.getCart();

        this.router.events.subscribe( s => {
            if ( s instanceof NavigationEnd ) {
            console.log( 'Router event ', s );
                //const anchor = this.route.snapshot.fragment;
                if ( !this.route.snapshot.fragment ) {
                    window.scrollTo( 0, 0 );
                    $("#mainNav").addClass("app-sticky");
                } else {
                    console.log('scroll1');
                    this.scrollTo(this.route.snapshot.fragment);
                }

                
                //SCROLL STUFF
                //const myevent = new CustomEvent( 'my-navigation-end', { detail: anchor } );

                //document.getElementById( 'home' ).dispatchEvent( myevent );
                /////////////////////////////window.dispatchEvent( myevent );

                //magnific to be updated here
               window.dispatchEvent( new CustomEvent( 'products-loaded' ) );


            }
        } );

    }

}
