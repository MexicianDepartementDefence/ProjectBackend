import { Injectable,HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/Response/base.response';
import { Repository } from 'typeorm';
import { DtoRegister } from './auth.dto';
import { Hash } from 'crypto';
import { ResponseSuccess } from 'src/user/interface/respone';
import { User } from './auth.entity';

@Injectable()

export class AuthService extends BaseResponse {
    constructor (
@InjectRepository(User) private readonly authRepository : Repository<User>
    ) {
        super()
    }

    async register (payload: DtoRegister) : Promise<ResponseSuccess> {
        return this._success("Sip")
    }
}
