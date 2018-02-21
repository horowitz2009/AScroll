import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
    name: 'default'
} )
export class DefaultPipe implements PipeTransform {

    
    transform( value: string, fallback: string ): any {
        if ( value ) {
            return value;
        } else {
            return fallback;
        }

    }

}
