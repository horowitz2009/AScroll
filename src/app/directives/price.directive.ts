import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive( {
    selector: '[appPrice]'
} )
export class PriceDirective {

    constructor( private el: ElementRef ) { }

    @Input( 'price' ) price: number;

}
