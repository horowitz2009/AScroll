export class CheckoutModel {
    constructor(
        public name: string,
        public phone: string,
        public address?: string,
        public wantInvoice?: boolean,
        public invoiceInfo?: string,
        public email?: string ) { }

}
