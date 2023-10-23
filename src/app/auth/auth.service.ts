import { Injectable, HttpStatus, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/Response/base.response';
import { Repository } from 'typeorm';
import { DtoRegister, DtonyaLogin } from './auth.dto';
import { compare, hash } from 'bcrypt';
import { ResponseSuccess } from 'src/interface/respone';
import { User } from './auth.entity';
import { jwt_config } from 'src/config/jwt.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class AuthService extends BaseResponse {
    constructor(
        @InjectRepository(User) private readonly authRepository: Repository<User>,
        private jwtService: JwtService,
    ) {
        super()
    }

    generateJWT(payload: jwtPayload, expiresIn : string | number, token : string) {
        return this.jwtService.sign(
            payload, {
                secret: token,
                expiresIn : expiresIn
            }
        )
    }

    async register(payload: DtoRegister): Promise<ResponseSuccess> {
        const apakahUserAda = await this.authRepository.findOne({ where: { email: payload.email } })

        if (apakahUserAda) {
            throw new HttpException("Maaf User Sudah Daftar", HttpStatus.BAD_REQUEST)
        }

        payload.password = await hash(payload.password, 12);
        await this.authRepository.save(payload);
        return this._success("Sip", payload);
    }

    async Login(payload: DtonyaLogin): Promise<ResponseSuccess> {
        const apakahEmailada = await this.authRepository.findOne({ 
            where: { email: payload.email }, 
            select: {
                id: true,
                nama: true,
                email: true,
                password: true,
                refresh_token: true
            }

            
        })

        if (!apakahEmailada) {
            throw new HttpException(
                'Maaf, User Anda Tidak Dapat Ditemukan', HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        const cekKatasandi = await compare(
            payload.password,
            apakahEmailada.password
            
        );

        if (cekKatasandi) {
            const jwtPayload: jwtPayload =  {
id : apakahEmailada.id,
nama : apakahEmailada.nama,
email : apakahEmailada.email
            }

            const access_token = await this.generateJWT (
                jwtPayload,
                '1d',
                jwt_config.access_token_secret
            );

            const refresh_token = await this.generateJWT(
                jwtPayload,
                '7d',
                jwt_config.refresh_token_secret
            )

            await this.authRepository.save({
                refresh_token : refresh_token,
                id : apakahEmailada.id
            })
            return this._success('Login Sukses', {
                ...apakahEmailada,
                access_token: access_token,
                refresh_token: refresh_token
            })
        } else {
            throw new HttpException(
                'Maaf, Anda Harus Memasukkan Email Dan Password Yang Sesuai',
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }
    }

    async ProfilKu (id: number) : Promise<ResponseSuccess> {
        const user = await this.authRepository.findOne ({where: {
            id: id
        }})

        return this._success('OK', user);
    }

    async RefreshToken (id : number, token : string) : Promise<ResponseSuccess> {
        const apakahUserAda = await this.authRepository.findOne({
            where: {
                id: id,
                refresh_token: token
            },
            select : {
                id: true,
                nama: true,
                email: true,
                password: true,
                refresh_token: true
            }
        })

        console.log('user', apakahUserAda)
        if (apakahUserAda == null) {
            throw new UnauthorizedException()
        }

        const jwtPayload : jwtPayload = {
            id: apakahUserAda.id,
            nama: apakahUserAda.nama,
            email: apakahUserAda.email
        }

        const access_token = await this.generateJWT(
            jwtPayload,
            '1d',
            jwt_config.access_token_secret
        )

        const refresh_token = await this.generateJWT(
            jwtPayload,
            '7d',
            jwt_config.refresh_token_secret
        )

        await this.authRepository.save({
            refresh_token: refresh_token,
            id: apakahUserAda.id
        })

        return this._success('Success' , {...apakahUserAda, access_token: access_token, refresh_token: refresh_token})
    }
}
