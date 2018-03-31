import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { Status, ORDER_STATUSES, Translation } from "../cpanel/order.status";


@Pipe( {
    name: 'orderStatus'
} )
export class OrderStatusPipe implements PipeTransform {

    constructor( @Inject( LOCALE_ID ) private locale: string ) {

    }

    transform( value: any, args?: any ): any {
        //var x = [{ "id": 1 }, { "id": -2 }, { "id": 3 }].find(myObj => myObj.id < 0);

        const st: Status = ORDER_STATUSES.find( s => s.id === value );
        if ( st !== null ) {
            let t: Translation = st.translations.find( tr => tr.locale === this.locale );
            if ( t !== null ) {
                return t.translation;
            } else {
                t = st.translations.find( tr => tr.locale === 'en' );
                return t.translation;
            }
        }
        return value;
    }

}


//export const ORDER_STATUSES: { id: string, translations: {}[] }[] =


