import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path'; 
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
  imports: [   MailerModule.forRoot({
    transport: {
      host: 'sandbox.smtp.mailtrap.io', //sesuaikan konfigurasi 
      port: 2525,
      auth: {
        user: '116b44e4fce785',  //sesuaikan user
        pass: '0a66404e26**', //sesuaikan password 
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
