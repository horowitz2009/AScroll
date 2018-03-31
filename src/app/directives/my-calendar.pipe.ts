import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe( {
    name: 'myCalendar'
} )
export class MyCalendarPipe implements PipeTransform {

    constructor( @Inject( LOCALE_ID ) private locale: string ) {

    }

    transform( value: any, args?: any ): any {
        //console.log( "VALUE", value );

        const now = new Date();
        const vv = new Date( value );


        const datePipe = new DatePipe( this.locale );

        const today = this.locale === 'en' ? 'Today ' : 'Днес ';
        const yesterday = this.locale === 'en' ? 'Yesterday ' : 'Вчера ';
        if ( now.getDate() === vv.getDate() ) {
            //same day
            //return 'Днес ' + 

            return today + datePipe.transform( value, 'HH:mm' );

        } else if ( now.getDate() - vv.getDate() === 1 ) {
            //yesterday
            return yesterday + datePipe.transform( value, 'HH:mm' );
        } else {
            return datePipe.transform( value, 'dd.MM.yyyy HH:mm' );
        }
        //        
        //        
        //        
        //        console.log('tznow', now.getTimezoneOffset());
        //        console.log('tzvalue', vv.getTimezoneOffset());
        //        const n = now.valueOf();
        //        const v = vv.valueOf();
        //        const current = new Date().valueOf();
        //        const input = new Date( value ).valueOf();
        //
        //        const elapsed = current - input;
        //        
        //        const msPerMinute = 60 * 1000;
        //        const msPerHour = msPerMinute * 60;
        //        const msPerDay = msPerHour * 24;
        //        const msPerMonth = msPerDay * 30;
        //        const msPerYear = msPerDay * 365;
        //        
        //        console.log( "ELAPSED", elapsed );
        //
        //        if ( elapsed < msPerMinute ) {
        //            return Math.round( elapsed / 1000 ) + ' seconds ago';
        //        } else if ( elapsed < msPerHour ) {
        //            return Math.round( elapsed / msPerMinute ) + ' minutes ago';
        //        } else if ( elapsed < msPerDay ) {
        //            return Math.round( elapsed / msPerHour ) + ' hours ago';
        //        } else if ( elapsed < msPerMonth ) {
        //            return 'approximately ' + Math.round( elapsed / msPerDay ) + ' days ago';
        //        } else if ( elapsed < msPerYear ) {
        //            return 'approximately ' + Math.round( elapsed / msPerMonth ) + ' months ago';
        //        } else {
        //            console.log( 'inside the if condition', elapsed );
        //            return 'approximately ' + Math.round( elapsed / msPerYear ) + ' years ago';
        //        }
        //
        //
        //
        //        //return value;
        //
    }

}
