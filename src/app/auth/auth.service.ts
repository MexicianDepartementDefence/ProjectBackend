import { Injectable,HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/Response/base.response';
import { Repository } from 'typeorm';
import { DtoRegister } from './auth.dto';
import { hash } from 'bcrypt';
import { ResponseSuccess } from 'src/interface/respone';
import { User } from './auth.entity';

@Injectable()

export class AuthService extends BaseResponse {
    constructor (
@InjectRepository(User) private readonly authRepository : Repository<User>
    ) {
        super()
    }

    async register (payload: DtoRegister) : Promise<ResponseSuccess> {
        const apakahUserAda = await this.authRepository.findOne({where: {email: payload.email}})

        if (apakahUserAda) {
            throw new HttpException("Maaf User Sudah Daftar", HttpStatus.BAD_REQUEST)
        }

        payload.password = await hash(payload.password, 12);
        await this.authRepository.save(payload);
        return this._success("Sip", payload);
    }

    async Login (payload) : Promise<ResponseSuccess> {
        
    }
 }
