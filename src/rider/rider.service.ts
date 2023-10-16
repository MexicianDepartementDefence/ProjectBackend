import { Injectable, HttpStatus,HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rider } from './rider.entity';
import { buatArrayDtoRider, buatDtoRider, updateDtoRider } from './rider.dto';
import { ResponseSuccess } from 'src/interface/respone';
import BaseResponse from 'src/utils/Response/base.response';

@Injectable()
export class RiderService extends BaseResponse {
    constructor (@InjectRepository(Rider) private readonly riderRepository: Repository<Rider>) {
super();
    }

    async getAllRider() : Promise<ResponseSuccess> {
const Ketemu = await this.riderRepository.find()
return this._success('Sip', Ketemu)


    }

    async DapatkanDetailRider (id : number) : Promise<ResponseSuccess> {
const ketemu = await this.riderRepository.findOne({where : {id}})

if (ketemu == null) throw new NotFoundException(`Aduh Belum Ketemu Nich Id Nomor ${id}`)

return this._success('Sip', ketemu)
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
                status : "OK",
                message : "Sip",
                data : payload
            }
        }
        catch (err) {
throw new HttpException('Terjadi Kesalahan', HttpStatus.BAD_REQUEST)
        }

        
    }

    async UpdateDataRider (id : number, payload : updateDtoRider) : Promise<ResponseSuccess> {

        const Ketemu = await this.riderRepository.findOne({where : {id}});

        if (!Ketemu) {
throw new NotFoundException(`Maaf, Data Rider Dengan Id No ${id} Tidak Ditemukan`);
        }

        const baru = await this.riderRepository.save({...updateDtoRider, id: id})
        return {

status : "OK",
message : "Sip",
data : baru
        }
    }

    async createBulk (payload : buatArrayDtoRider) : Promise<ResponseSuccess> {
        try {
let berhasil = 0;
let gagal = 0;

await Promise.all(
    payload.data.map (
        async (data) => {
            try {
                await this.riderRepository.save(data);

                berhasil += 1
            }
            catch{
                gagal += 1
            }

            
        }
    )
    
)
return this._success("sip")
        }
        catch {
throw new HttpException("Terjadi Kesalahan", HttpStatus.BAD_REQUEST)
        }
    }

    async deleteBulk (id : number[]) : Promise<ResponseSuccess> {
        try {
let berhasil = 0;
let gagal = 0;

await Promise.all(
    id.map (
        async (id) => {
            try{
await this.riderRepository.delete(id);

berhasil += 1
            }
            catch {
gagal += 1
            }
        }
    )
)

return this._success("Sip")
        }
        catch {
throw new HttpException("Terjadi Kesalahan", HttpStatus.BAD_REQUEST)
        }
    }
}
