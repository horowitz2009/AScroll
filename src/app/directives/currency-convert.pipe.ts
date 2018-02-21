import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from "../currency/currency.service";

@Pipe( {
    name: 'convert'
} )
export class CurrencyConvertPipe implements PipeTransform {

    
    constructor( private currencyService: CurrencyService ) { }
    
    transform( value: number, currency: string = 'BGN' ): any {
        const newValue = this.currencyService.convert(value);
        
        return newValue;

    }

}
