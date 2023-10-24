import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./auth.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtAccessTokenStrategy } from "./jwtAccessToken.strategy";
import { JwtRefreshTokenStrategy } from "./jwtRefreshToken.strategy";
import { MailModule } from "../mail/mail.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      signOptions : {
        algorithm: 'HS512'
      }
    }),
    MailModule
],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}