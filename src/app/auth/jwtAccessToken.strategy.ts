import { Injectable } from "@nestjs/common/decorators";
import {PassportStrategy} from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwt_config } from "src/config/jwt.config";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy (Strategy, 'jwt_access_token') {
constructor() {
    super({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration : false,
        secretOrKey : jwt_config.access_token_secret
    })
}

async validate(payload: any) {
    return payload;
}
}