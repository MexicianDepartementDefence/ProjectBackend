import { Injectable, HttpStatus,HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rider } from './rider.entity';
import { buatDtoRider, updateDtoRider } from './rider.dto';
import { ResponseSuccess } from 'src/user/interface/respone';

@Injectable()
export class RiderService {
    constructor (@InjectRepository(Rider) private readonly riderRepository: Repository<Rider>) {}

    async getAllRider() : Promise<ResponseSuccess> {
const Ketemu = await this.riderRepository.find()
return {
    status : "Sukses",
    message : "Berhasil Menemukan List Rider",
    data : Ketemu
    
}


    }

    async DapatkanDetailRider (id : number) : Promise<ResponseSuccess> {
const ketemu = await this.riderRepository.findOne({where : {id}})

if (ketemu == null) throw new NotFoundException(`Aduh Belum Ketemu Nich Id Nomor ${id}`)

return {
    status : "Sukses",
    message : "Berhasil Menemukan Detail Para Rider",
    data : ketemu
}
    }

    async buatDataRider (payload : buatDtoRider) : Promise<ResponseSuccess> {
        const {nama_pembalap, tim, tahun_masuk, tahun_keluar, menang, podium} = payload

        try {
            await this.riderRepository.save({
                nama_pembalap: nama_pembalap,
                tim : tim,
                tahun_masuk : tahun_masuk,
                tahun_keluar : tahun_keluar,
                menang : menang,
                podium : podium
            })

            return {
                status : "",
                message : "",
                data : payload
            }
        }
        catch (err) {
throw new HttpException('Terjadi Kesalahan', HttpStatus.BAD_REQUEST)
        }
    }
}
