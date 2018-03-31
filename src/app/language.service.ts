import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Response } from '@angular/http';

import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { CookieService } from "ngx-cookie-service";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/skipWhile';
import { Language } from "./language";

@Injectable()
export class LanguageService {
    
    private baseUrl = 'lang.php';  // URL to web api
    private headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

    private _langSubject: BehaviorSubject<string[]>;
    private dataStore: {
        userLanguages: string[]
    };

    //PUBLIC
    get userLanguages(): Observable<string[]> {
        return this._langSubject.asObservable();
    }
    

    constructor( private http: HttpClient, private cookieService: CookieService ) {
        this.dataStore = { userLanguages: ["bg"] };
        this._langSubject = <BehaviorSubject<string[]>>new BehaviorSubject( this.dataStore.userLanguages );
        console.log( "Language service created" );
    }

    detectUserLanguages(): void {
        console.log( "Detecting language..." );
        const req = this.http.get<any>( `lang.php` );

        req.subscribe( data => {
            console.log( 'user languages', data );

            this.dataStore.userLanguages = data.lang;
            this._langSubject.next( Object.assign( {}, this.dataStore ).userLanguages );
        } );


    }

}
