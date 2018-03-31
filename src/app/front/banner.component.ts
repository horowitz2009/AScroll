import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component( {
    selector: 'app-front-banner',
    templateUrl: './banner.component.html',
    styles: [`
  
  .center-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 110px;
  }
  
  
  `],
    encapsulation: ViewEncapsulation.None
} )
export class BannerComponent implements OnInit {

    constructor() { }

    scrollTo( anchor: string ) {
        const myevent = new CustomEvent( 'my-navigation-end', { detail: anchor } );
        window.dispatchEvent( myevent );
    }

    ngOnInit() {
    }

}
