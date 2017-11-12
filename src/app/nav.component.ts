import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { ActivatedRoute, Router, ParamMap, Params, NavigationEnd } from "@angular/router";

@Component( {
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styles: []
} )
export class NavComponent implements OnInit {

    //anchor: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {

        //
        //        router.events.subscribe(( val ) => {
        //            console.log( 'route event', val );
        //
        //            //console.log( route.params.getValue() );
        //            //console.log( 'boohoo ', val instanceof NavigationEnd );
        //            console.log( 'activated route', route );
        //
        //            route.queryParamMap.subscribe(
        //                ( hmm ) => { console.log( hmm ); }
        //            );
        //            this.route.params.forEach(( params: Params ) => {
        //                console.log( 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa', params );
        //                if ( params['section'] ) {
        //                    console.log( "SECTION: " + params['section'] );
        //                }
        //            } );
        //
        //            /*this.anchor = this.route.paramMap
        //    .switchMap(( params: ParamMap ) => {
        //        console.log( 'params', params );
        //        console.log( 'keys', params.keys );
        //        return params.get( 'section' );
        //    } );*/
        //        } );


    }

    ngOnInit() {
        //
        //
        this.router.events.subscribe( s => {
            if ( s instanceof NavigationEnd ) {
                const tree = this.router.parseUrl( this.router.url );
                const anchor = tree.fragment;
                console.log( tree );

                const myevent = new CustomEvent( 'my-navigation-end', { detail: anchor } );

                //document.getElementById( 'home' ).dispatchEvent( myevent );
                window.dispatchEvent( myevent );

                //OLD not working
                //console.log( 'url', this.router.url );
                //
                //                if ( tree.fragment ) {
                //                    let target = $( tree.fragment );
                //                    console.log('target:', target);
                //                    target = target.length ? target : $('[name=' + tree.fragment + ']');
                //                    console.log('target   :' + tree.fragment);
                //                    console.log('target:', target);
                //                    const element = document.querySelector( "#" + tree.fragment );
                //                    //if ( target.length ) {
                //                        console.log('damnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
                //                        $( 'html, body' ).animate( {
                //                            scrollTop: ( element.scrollTo(0 - 56 )
                //                        }, 800, "easeInOutExpo", () => {
                //                            //spy = true;
                //                            //changeHash(hash);
                //                        } );
                //
                //                        return false;
                //                    //}
                //

//                // OLD working - no smooth
//                const element = document.querySelector( "#" + tree.fragment );
//                if ( element ) {
//
//                    setTimeout( function() {
//                        //alert("Hello"); 
//                        console.log( 'scroll in 1 s.............................' );
//                        element.scrollIntoView( { behavior: "smooth", block: "start", inline: "nearest" } );
//                    }, 50 );
//
//
//                } else {
//                    window.scrollTo( 0, 0 );
//                }



                // }
            }
        } );
        //
        //
        //
        //        this.route.paramMap.map(( params: ParamMap ) => {
        //            console.log( 'params', params );
        //            console.log( 'selected: ', params.get( 'id' ) );
        //            // (+) before `params.get()` turns the string into a number
        //
        //            //return true;
        //        } );
        //
        //        this.route.url.subscribe(
        //            ( hmm ) => {
        //                console.log( "hmmmmm:", hmm );
        //            }
        //        );
        //
        //        this.route.params.forEach(( params: Params ) => {
        //            if ( params['section'] ) {
        //                console.log( "SECTION: " + params['section'] );
        //            }
        //        } );
    }

}
