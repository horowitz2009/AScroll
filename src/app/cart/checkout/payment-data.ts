export class PaymentData {
    public methodOfPayment: string;
    
    public editPayment: boolean;
    public touched: boolean;

    constructor() {
        this.methodOfPayment = 'cash';
        
        this.editPayment = true;
        this.touched = false;
    }

    public isDataOK(): boolean {
        return this.methodOfPayment ? true : false;
    }

}
