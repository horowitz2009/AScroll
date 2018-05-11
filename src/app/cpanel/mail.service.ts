import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Response } from '@angular/http';

@Injectable()
export class MailService {


    constructor( private http: HttpClient ) { }

    //private baseUrl = 'php/mailer/sendsmtp.php';
    private baseUrl = 'php/mailer/sendmail.php';
    private baseUrl2 = 'php/mailservice.php';


    sendMail( args: { email: string, subject?: string, message: string } = { email: "boo", subject: "damn", message: "hmm" } ): void {
        const json = JSON.stringify(
            { "email": args.email, "subject": args.subject, "message": args.message } );
        this.http.post<any>( `${this.baseUrl}`, json )
            .subscribe( res => {
                console.log( "message sent successfully", res );
            }, error => {
                console.log( 'Message sending failed!', error );
            }
            );
    }

    sendMail2( { email = 'zhristov@gmail.com', subject = 'Поръчка 20190', message = 'test' } ): void {
        const json = JSON.stringify(
            { "email": email, "subject": subject, "message": message } );
        this.http.post<any>( `${this.baseUrl}`, json )
            .subscribe( res => {
                console.log( "message sent successfully", res );
            }, error => {
                console.log( 'Message sending failed!', error );
            }
            );
    }
    
    sendMail3( { email, subject = 'no subject', message } ): void {
        const json = JSON.stringify(
            { "email": email, "subject": subject, "message": message } );
        this.http.post<any>( `${this.baseUrl}`, json )
            .subscribe( res => {
                console.log( "message sent successfully", res );
            }, error => {
                console.log( 'Message sending failed!', error );
            }
            );
    }

   /*
    *         this.mailService.sendMailTemplate( { 
            "email": "zhristov@gmail.com", 
            "subject": subject, 
            "templateFile": "templateContact.php", 
            "variables": [{"key": "name", "value": from}, 
                          {"key": "email", "value": email},
                          {"key": "subject", "value": subject},
                          {"key": "message", "value": this.model.message},
                
            ] 
        
        } );
    */
    
    sendMailTemplate( { email, subject = 'no subject', templateFile = 'template1.php', variables = {} } ): void {
        const json = JSON.stringify(
            { "email": email, "subject": subject, "templateFile": templateFile, "variables" : variables } );
        this.http.post<any>( `${this.baseUrl}`, json )
            .subscribe( res => {
                console.log( "message sent successfully", res );
            }, error => {
                console.log( 'Message sending failed!', error );
            }
            );
    }
}
