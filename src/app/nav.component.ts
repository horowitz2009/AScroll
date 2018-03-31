import { Component, OnInit, AfterViewChecked } from '@angular/core';

import * as $ from 'jquery';
import { ActivatedRoute, Router, ParamMap, Params, NavigationEnd } from "@angular/router";
import { Cart } from "./cart/cart";
import { CartService } from "./cart/cart.service";
import { UserService } from "./auth/user.service";

@Component( {
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styles: [`
    
    .app-sticky .navbar-logo {
      max-height: 40px;
      opacity: 1;
      filter: alpha(opacity=100); /* For IE8 and earlier */
      transition: all 0.5s ease-in;
    }
    .navbar-logo {
      max-height: 51px;
      opacity: 0.25;
      filter: alpha(opacity=25); /* For IE8 and earlier */
      transition: all 0.5s ease-in;
    }
    .btn.dropdown-toggle.my-dropdown {
      background-color: #03C4EB;
      border-color: #03C4EB;
      padding: 0px 0px 0px 3px;
      color: white;
      text-shadow: none;
    }
    
    .dark .btn.dropdown-toggle.my-dropdown:hover {
      background-color: #0c9ec7;
      border-color: #0c9ec7;
    
    }

    
    `]
} )
export class NavComponent implements OnInit, AfterViewChecked {

    // this.router.navigate( [ '/my-app-route' ], { fragment: prodID } );
    cart: Cart = undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService,
        private userService: UserService
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
    
    adminLogged() {
        return this.userService.adminLogged();
    }

    ngOnInit() {
        
        //this.cart = this.cartService.getCart();
        this.cartService.cartObs.subscribe(cart => {
            if (cart) {
              console.log("nav CART LOADED", cart);
              this.cart = cart;
            }
        });

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
