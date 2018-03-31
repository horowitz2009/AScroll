import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
} )
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private userService: UserService ) { }

    ngOnInit() {
        // reset login status
        this.userService.logout();
    }

    login() {
        this.loading = true;
        this.userService.login2( this.model.username, this.model.password )
            .subscribe( result => {
                if ( result === true ) {
                    this.router.navigate( ['/cpanel/orders'] );
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            } );
    }

}
