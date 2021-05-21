import { Controller, Get } from '@nestjs/common';
import { CmailerService } from './cmailer.service';

@Controller('api/mailer')
export class MailerController {
  constructor(private serv: CmailerService) { }

  @Get('send-mail')
  public async sendMail() {
    return this.serv.send('Dmitriy test', 'intro333@ya.ru', 'en');
  }
}
