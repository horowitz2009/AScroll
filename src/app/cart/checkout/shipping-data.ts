export class ShippingData {
    public name: string;
    public phone: string;
    public address: string;
    public email: string;
    public wantInvoice: boolean;
    public invoiceInfo: string;
    public editShipping: boolean;
    public touched: boolean;



    constructor( name: string, phone: string ) {
        this.name = name;
        this.phone = phone;
        this.editShipping = true;
        this.touched = false;
    }
    
    public isDataOK(): boolean {
        return this.name && this.phone ? true : false;
    }



}
