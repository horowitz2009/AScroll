import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-front-banner',
  templateUrl: './banner.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent implements OnInit {

  constructor() { }

  scrollTo(anchor: string) {
      const myevent = new CustomEvent( 'my-navigation-end', { detail: anchor } );
      window.dispatchEvent( myevent );
  }
  
  ngOnInit() {
  }

}
