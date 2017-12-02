export class MethodOfPayment {

    constructor( public code: string, public desc: string, public longDesc ) { }

}

export const METHODS_OF_PAYMENT = [new MethodOfPayment( 'cash', "Наложен платеж", "Плащате на куриера при получаване на пратката." ),
                                   new MethodOfPayment( 'borica', "Плащане с карта", "Ще бъдете пренасочен към страницата на Борика, където ще извършите плащането." ),
                                   new MethodOfPayment( 'epay', "ePay.bg", "Ще бъдете пренасочен към страницата на ePay, където ще извършите плащането." ),
                                   new MethodOfPayment( 'paypal', "PayPal", 
                                           "Плащането ще се извърши чрез PayPal. Не е нужно да имате или регистрирате акаунт. Можете да направите еднократно плащане като гост."),
                                   new MethodOfPayment( 'bank', "Банков превод", "Нареждате банков превод по указана IBAN сметка и основание за плащане."  ),
                                   
                                   ];
