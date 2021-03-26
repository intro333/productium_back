import { Injectable } from '@nestjs/common';
import { MailerService as MailerServiceFromLib } from '@nestjs-modules/mailer';

@Injectable()
export class CmailerService {
  constructor(private readonly mailerService: MailerServiceFromLib) {}

  public send(name, email): void {
    console.log('SEND MAIL');

    this
      .mailerService
      .sendMail({
        to: email, // list of receivers
        from: 'info@productium.org', // sender address
        subject: 'Productium subscribe.', // Subject line
        // text: 'welcome', // plaintext body
        // html: '<b>welcome</b>', // HTML body content
        template: 'hello',
        context: {
          username: name,
        },
      })
      .then(() => {})
      .catch(() => {});
  }
}
