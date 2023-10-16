import { Controller, Post, Body } from '@nestjs/common';
import { DtoRegister } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post ("Register")
    async register(@Body() payload: DtoRegister) {
        return this.authService.register(payload)
    }

    @Post("Login")
    async login() {
        
    }
}
