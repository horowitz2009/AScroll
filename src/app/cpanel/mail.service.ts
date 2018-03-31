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

    private baseUrl = 'php/mailer/sendsmtp.php';
    private baseUrl2 = 'php/mailservice.php';


    sendMail( { email, subject = 'Поръчка 20190', message } ): void {
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
    sendMail2( { email, subject = 'Поръчка 20190', message } ): void {
        const json = JSON.stringify(
            { "email": email, "subject": subject, "message": message } );
        this.http.post<any>( `${this.baseUrl2}`, json )
            .subscribe( res => {
                console.log( "message sent successfully", res );
            }, error => {
                console.log( 'Message sending failed!', error );
            }
            );
    }}
