import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { CmailerService } from './cmailer.service';

@Module({
  controllers: [MailerController],
  providers: [CmailerService],
})
export class MailerModule {}
