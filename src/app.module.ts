import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { CommunityModule } from './community/community.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule as CustomMailer } from './mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CommunityModule,
    MailerModule.forRoot({
      // transport: {
      //   host: 'smtp.mailtrap.io',
      //   port: 2525,
      //   auth: {
      //     user: '0298a410fa018c',
      //     pass: '7fc13a0685475c',
      //   },
      // },
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'info@productium.org',
          pass: 'oRpnLnZn3*cE',
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    CustomMailer,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
