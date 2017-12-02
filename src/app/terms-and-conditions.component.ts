import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap";

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class TermsAndConditionsComponent implements OnInit {

    constructor( public bsModalRef: BsModalRef ) { }

  ngOnInit() {
  }

}
