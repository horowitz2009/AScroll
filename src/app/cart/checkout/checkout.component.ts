import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from "../cart.service";
import { Cart } from "../cart";
import { environment } from '../../../environments/environment';
import { MethodOfPayment, METHODS_OF_PAYMENT } from "./method-of-payment";
import { ShippingData } from "./shipping-data";
import { PaymentData } from "./payment-data";
import { TermsAndConditionsComponent } from "../../terms-and-conditions.component";
import { BsModalService } from "ngx-bootstrap";
import { Router } from "@angular/router";
import { OrderService } from "./order.service";
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

declare let paypal: any;

@Component( {
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
} )
export class CheckoutComponent implements OnInit, AfterViewInit {

    methods: MethodOfPayment[];

    model = new ShippingData( "", "" );

    pModel = new PaymentData();

    agreeCB = false;

    paymentResult = '';

    cart: Cart;

    amountMF: string;
    constructor( private router: Router, private cartService: CartService, private orderService: OrderService, private modalService: BsModalService ) { }

    private loadExternalScript( scriptUrl: string ) {
        return new Promise(( resolve, reject ) => {
            const scriptElement = document.createElement( 'script' );
            scriptElement.src = scriptUrl;
            scriptElement.onload = resolve;
            document.body.appendChild( scriptElement );
        } );

    }

    allOK(): boolean {
        return this.model.isDataOK() && this.pModel.isDataOK();
    }

    paymentOK() {
        this.paymentResult = 'ПЛАТЕНО';
    }

    onSubmit() {
        this.model.editShipping = false;
        this.model.touched = true;
        this.cartService.saveCart();
    }

    onSubmit2() {
        this.pModel.editPayment = false;
        this.pModel.touched = true;
        this.cartService.saveCart();
    }

    canFinalize(): boolean {
        return true; //( this.allOK() && this.pModel.touched && this.model.touched );
    }

    finalize(): void {
        //const order = this.cartService.toOrder();
        //console.log( "FINALIZE THE FUCKING ORDER!", order );
        this.cartService.finalize(
            () => {
                this.router.navigate( ['/checkout/finalize'] );
            },
            () => {
                console.log( "UH OH" );

            } );

        console.log( "finilize request sent" );
    }

    openTermsAndConditions() {
        const bsModalRef = this.modalService.show( TermsAndConditionsComponent, { class: 'gray modal-lg' } ); // for bigger modal: , { class: 'gray modal-lg' }

    }

    getSelectedMethodOfPayment(): MethodOfPayment {
        const res = this.methods.filter(( m ) => m.code === this.pModel.methodOfPayment );
        return res[0];
    }

    ngAfterViewInit(): void {
        console.log( "AFTERVIEW", this.amountMF );

        //        this.loadExternalScript( "https://www.paypalobjects.com/api/checkout.js" ).then(() => {
        //            console.log( "AFTERVIEW2", this.amountMF );
        //
        //            const tr = {
        //                payment: {
        //                    transactions: [
        //                        {
        //                            amount: { total: '' + this.amountMF, currency: 'EUR' }
        //                        }
        //                    ]
        //                }
        //            };
        //            const hmm = {
        //                env: 'sandbox',
        //                client: {
        //                    sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
        //                    production: '<insert production client id>'
        //                },
        //
        //                commit: true,
        //
        //                payment: function( data, actions ) {
        //
        //                    return actions.payment.create( tr );
        //                },
        //
        //                onAuthorize: function( data, actions ) {
        //
        //                    return actions.payment.execute().then( function() {
        //                        //window.alert( 'Payment Complete!' );
        //                        this.paymentOK();
        //                        console.log( 'BOOOOO' );
        //                    } );
        //                }
        //
        //            };
        //
        //            paypal.Button.render( hmm, '#paypal-button-container' );
        //
        //            //END  
        //        } );
    }







    ngOnInit() {
        this.cart = this.cartService.getCart();
        this.model = this.cart.shippingData;
        this.pModel = this.cart.paymentData;

        this.methods = METHODS_OF_PAYMENT.filter(( m ) =>
            environment.methodsOfPayment.indexOf( m.code ) >= 0
        );

        if ( this.methods.length === 1 ) {
            this.pModel.methodOfPayment = this.methods[0].code;
            this.pModel.editPayment = false;
            this.pModel.touched = true;
        }

        //TODO load shipping data

        this.amountMF = '2.03';
        console.log( "INIT", this.amountMF );

        /*$.getScript( 'https://www.paypalobjects.com/api/checkout.js', function() {

            
        } );*/

    }

    get diagnostic() {
        return JSON.stringify( this.model );
    }

}
