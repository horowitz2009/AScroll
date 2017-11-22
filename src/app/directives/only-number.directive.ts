import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Item } from "../cart/item";

@Directive( {
    selector: '[appOnlyNumber]'
} )
export class OnlyNumberDirective {

    constructor( private el: ElementRef ) { }

    @Input( 'quantityHolder' ) item: Item;

    @HostListener( 'focusout', ['$event'] ) onBlur( event ) {
        const v = parseInt( '' + this.el.nativeElement.value, 10 );
        if ( isNaN( v ) ) {
            this.el.nativeElement.value = 1;
            if ( this.item ) {
                this.item.quantity = 1;
            }
        }
    }

    @HostListener( 'keydown', ['$event'] ) onKeyDown( event ) {
        const e = <KeyboardEvent>event;
        if ( [46, 8, 9, 27, 13, 110, 190].indexOf( e.keyCode ) !== -1 ||
            // Allow: Ctrl+A
            ( e.keyCode === 65 && ( e.ctrlKey || e.metaKey ) ) ||
            // Allow: Ctrl+C
            ( e.keyCode === 67 && ( e.ctrlKey || e.metaKey ) ) ||
            // Allow: Ctrl+V
            ( e.keyCode === 86 && ( e.ctrlKey || e.metaKey ) ) ||
            // Allow: Ctrl+X
            ( e.keyCode === 88 && ( e.ctrlKey || e.metaKey ) ) ||
            // Allow: home, end, left, right
            ( e.keyCode >= 35 && e.keyCode <= 39 ) ) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ( ( e.shiftKey || ( e.keyCode < 48 || e.keyCode > 57 ) ) && ( e.keyCode < 96 || e.keyCode > 105 ) ) {
            e.preventDefault();
        } else {
            const ss = this.el.nativeElement.selectionStart;
            const se = this.el.nativeElement.selectionEnd;
            let ov: string = "" + this.el.nativeElement.value;
            const sel = ( "" + this.el.nativeElement.value ).substring( ss, se );
            ov = ov.substring( 0, ss ) + event.key + ov.substr( se );
            const vv = parseInt( ov, 10 );
            if ( !isNaN( vv ) ) {
                if ( vv < 1 || vv > 99 ) {
                    e.preventDefault();
                }
            }
        }
    }
}
