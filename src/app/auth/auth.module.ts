import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./auth.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtAccessTokenStrategy } from "./jwtAccessToken.strategy";
import { JwtRefreshTokenStrategy } from "./jwtRefreshTokenStrategy";
import { MailModule } from "../mail/mail.module";
import { ResetPassword } from "./reste_password.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([User, ResetPassword]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({}),
    MailModule
],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}