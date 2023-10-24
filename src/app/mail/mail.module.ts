import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path'; 
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
  imports: [MailerModule.forRoot({
    transport : {
      host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2fdfc79a8bae9a",
    pass: "********7a67"
  },
    },
    defaults: {
      from: '"No Reply" <noreply@example.com'
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true
      }
    }
  })],

  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
