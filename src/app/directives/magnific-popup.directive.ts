import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive( {
    selector: '[appMagnificPopup]'
} )
export class MagnificPopupDirective {
    el: ElementRef;
    //@Input( 'appMagnificPopup' ) appColor: string;

    constructor( el: ElementRef ) {
        this.el = el; //el.nativeElement.style.backgroundColor = 'yellow';
        console.log( "ELEMENT", el );
        console.log( el.nativeElement );
//STILL NOT WORKING
        
//        $( el.nativeElement ).magnificPopup( {
//            type: "image",
//            gallery: {
//                enabled: false,
//            }
//        } );
    }

    //    @HostListener( 'mouseenter' ) onMouseEnter() {
    //        this.highlight( this.appColor || 'blue' );
    //    }
    //
    //    @HostListener( 'mouseleave' ) onMouseLeave() {
    //        this.highlight( null );
    //    }
    //
    //    private highlight( color: string ) {
    //        this.el.nativeElement.style.backgroundColor = color;
    //    }

}
