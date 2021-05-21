import { Injectable } from '@nestjs/common';
import { MailerService as MailerServiceFromLib } from '@nestjs-modules/mailer';

@Injectable()
export class CmailerService {
  constructor(private readonly mailerService: MailerServiceFromLib) {}

  public send(name, email, lang): void {
    console.log('SEND MAIL', lang);
    const template = lang + '_hello';
    console.log('SEND template', template);
    this
      .mailerService
      .sendMail({
        to: email, // list of receivers
        from: 'info@productium.org', // sender address
        subject: 'Welcome to Productium', // Subject line
        // text: 'welcome', // plaintext body
        // html: '<b>welcome</b>', // HTML body content
        template: template,
        context: {
          username: name,
          email: email,
        },
      })
      .then(() => {})
      .catch(() => {});
  }
}
