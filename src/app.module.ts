import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { CommunityModule } from './community/community.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule as CustomMailer } from './mailer/mailer.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsAllModule } from './projects-all/projects-all.module';

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
      // transport: {
      //   host: 'email-smtp.eu-central-1.amazonaws.com',
      //   port: 25,
      //   // secure: 'tls',
      //   auth: {
      //     user: 'AKIA5HPT3BJ22G3SFT4L',
      //     pass: 'BHjvClThUO4FHGfla0WYHuGC/QEeGFtZ8lAwxN5doKdP',
      //   },
      // },
      transport: {
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
          user: 'intro8360@gmail.com',
          pass: 'Syt31JwTH2rGhqEm',
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
    AuthModule,
    UsersModule,
    ProjectsAllModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
