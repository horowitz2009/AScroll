import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-front',
  template: `
    <app-front-banner></app-front-banner>
    <app-products></app-products>
    <app-social-panel></app-social-panel>
    <app-front-about></app-front-about>
    <app-front-contact></app-front-contact>
    
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class FrontComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
