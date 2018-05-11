export class Message {
    name: string;
    email: string;
    subject: string;
    message: string;

    clear(): void {
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
    }
}
