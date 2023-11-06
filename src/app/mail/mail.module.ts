import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
  imports: [   MailerModule.forRoot({
    transport: {
      host: 'sandbox.smtp.mailtrap.io', //sesuaikan konfigurasi 
      port: 2525,
      auth: {
        user: "2fdfc79a8bae9a",
    pass: "6f65c295857a67"
      },
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
    template: {
      dir: join(__dirname, 'templates'),  // template akan di ambil dari handlebar yang ada pada folder templates
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),],

  providers: [MailService],
  exports: [MailService]
})


export class MailModule {}


