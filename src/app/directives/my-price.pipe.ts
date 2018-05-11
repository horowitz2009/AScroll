import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'myPrice'
})
export class MyPricePipe implements PipeTransform {

    constructor( @Inject( LOCALE_ID ) private locale: string ) {

    }

    transform( value: any, args?: any ): any {
        //console.log( "VALUE", value );



        const decimalPipe = new DecimalPipe( this.locale );

        return decimalPipe.transform( value, '1.2-2' ) + " " + decimalPipe.transform( value, '1.0-0' ) + " " + decimalPipe.transform( value, '0.2-2' );
    }


}
