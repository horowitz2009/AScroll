export class PaymentData {
    public methodOfPayment: string;
    
    public editPayment: boolean;
    public touched: boolean;

    constructor() {
        this.clear();
    }

    public isDataOK(): boolean {
        return this.methodOfPayment ? true : false;
    }
    
    public clear(): void {
        this.methodOfPayment = 'cash';
        this.editPayment = true;
        this.touched = false;
    }
    
    public load(o: PaymentData) {
        this.methodOfPayment = o.methodOfPayment;
    }

}
