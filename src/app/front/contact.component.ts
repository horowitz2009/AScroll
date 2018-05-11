import { Component, OnInit } from '@angular/core';
import { Message } from "./message";
import { MailService } from "../cpanel/mail.service";

@Component( {
    selector: 'app-front-contact',
    templateUrl: './contact.component.html',
    styles: [`
    
      .invisible {
          visibility: hidden;
      }       
             
    `]
} )
export class ContactComponent implements OnInit {

    msgResponse = false;

    model: Message;

    constructor( private mailService: MailService ) {
        this.model = new Message();
    }


    sendMessage() {
        this.model.clear();
        const from = this.model.name || "[анонимен]";
        const email = this.model.email || "[не е указан]";
        const subject = this.model.subject || "[без заглавие]";
        const msg = "Запитване от: " + from + ", имейл: " + email +
            "\n\nЗАГЛАВИЕ: " + subject +
            "\n\nТЕКСТ:\n" + this.model.message;

        this.mailService.sendMail( { "email": "zhristov@gmail.com", "subject": subject, "message": msg } );
        this.msgResponse = true;
        setTimeout(() => {
            this.msgResponse = false;
        }, 10000 );
    }

    ngOnInit() {
    }

}
