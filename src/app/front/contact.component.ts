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
        console.log("SEND MESSAGE");
        const from = this.model.name || "[анонимен]";
        const email = this.model.email || "[не е указан]";
        let subject = this.model.subject || "[без заглавие]";
        subject = "Съобщение от " + from + " - " + subject;
        
//        const msg = "Запитване от: " + from + ", имейл: " + email +
//            "\n\nЗАГЛАВИЕ: " + subject +
//            "\n\nТЕКСТ:\n" + this.model.message;

        //this.mailService.sendMail( { "email": "zhristov@gmail.com", "subject": subject, "message": msg } );
        
        this.mailService.sendMailTemplate( { 
            "email": "zhristov@gmail.com", 
            "subject": subject, 
            "templateFile": "templateContact.php", 
            "variables": [{"key": "name", "value": from}, 
                          {"key": "email", "value": email},
                          {"key": "subject", "value": subject},
                          {"key": "message", "value": this.model.message},
                
            ] 
        
        } );

        this.model.clear();
        this.msgResponse = true;
        setTimeout(() => {
            this.msgResponse = false;
        }, 10000 );
    }

    ngOnInit() {
    }

}
