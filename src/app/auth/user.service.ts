import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper } from 'angular2-jwt';
import { Response } from '@angular/http';


@Injectable()
export class UserService {

    public token: string;

    constructor( private http: HttpClient, private jwtHelper: JwtHelper ) { }

    private baseUrl = 'php/userservice.php';

    registerNewUser( email: string, password: string, name?: string ): void {
        const json = JSON.stringify(
            { "email": email, "password": password, "name": name } );
        this.http.post<any>( `${this.baseUrl}/register`, json )
            .subscribe( res => {
                console.log( "user saved", res );

            }, error => console.log( 'Could not register user.', error ) );
    }

    login( email: string, password: string ): void {
        const json = JSON.stringify(
            { "email": email, "password": password } );
        this.http.post<any>( `${this.baseUrl}/login`, json )
            .subscribe( res => {
                console.log( "user logged successfully", res );
                //TODO make login ok if token available, else not ok
            }, error => {
                console.log( 'Login failed!', error );
                //TODO this should happend if critical error occurs
            }
            );
    }

    adminLogged() {
        if ( localStorage.getItem( 'currentUser' ) ) {
            // logged in so return true
            const token = localStorage.getItem( 'currentUser' );
            const decoded = this.jwtHelper.decodeToken( token );
            //console.log( "LOCALSTORAGE", decoded.roles );
            const roles = decoded.roles.split( ',' );
            if ( roles.indexOf( 'admin' ) >= 0 ) {
                return true;
            }

        }
        return false;
    }

    login2( email: string, password: string ): Observable<boolean> {
        return this.http.post<any>( `${this.baseUrl}/login`, JSON.stringify(
            { "email": email, "password": password } ) )

            .map(( response ) => {
                // login successful if there's a jwt token in the response
                const token = response.token;
                if ( token ) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    //localStorage.setItem( 'currentUser', JSON.stringify( { email: email, token: token } ) );
                    localStorage.setItem( 'currentUser', token );
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            } );
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem( 'currentUser' );
    }
}
