import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators, } from '@angular/forms';

const EMAIL_REGEXP =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;


@Directive( {
    selector: '[appEmailOptional]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailOptionalValidatorDirective, multi: true }]
} )
export class EmailOptionalValidatorDirective implements Validator {

    validate( control: AbstractControl ): { [key: string]: any } {
        //console.log( control );
        return control.value === null
            || control.value === undefined
            || control.value === '' || EMAIL_REGEXP.test( control.value ) ? null : { 'email': true };
    }
}
