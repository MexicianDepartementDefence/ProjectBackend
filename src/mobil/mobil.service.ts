import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mobil } from './mobil.entity';
import { Repository } from 'typeorm';
import { CreateMobilDto, UpdateMobilDto, createMobilArrayDto } from './mobil.dto';
import { ResponseSuccess } from 'src/user/interface/respone';

@Injectable()
export class MobilService {
    constructor(@InjectRepository(Mobil) private readonly MobilRepository: Repository<Mobil>) { }
async getAllMobil () : Promise<ResponseSuccess> {
   const check = await this.MobilRepository.find() 
   return {
    status : "Berhasil",
    message : "List Pembeli Sudah Ditemukan",
    data : check
   }
}

async DetailMobil (id : number) : Promise<ResponseSuccess> {
    const detailMobil = await this.MobilRepository.findOne({
        where : {id}
    })

    if (detailMobil == null) {
        throw new NotFoundException(`Pembeli Dengan id ${id} Tidak Dapat Ditemukan`)
    }

    return {
        status : "Berhasil",
        message : "Detail Pembeli Sudah Ditemukan",
        data : detailMobil
       }
}
 
    async createMobil(payload: CreateMobilDto): Promise<ResponseSuccess> {
        const { nama, merek_mobil, tipe_mobil, harga, tahun } = payload

        try {
            await this.MobilRepository.save({
                nama: nama, merek_mobil : merek_mobil, tipe_mobil : tipe_mobil, harga : harga, tahun : tahun
            })
            return {
                status: "Berhasil",
                message: "Berhasil Menambahkan Pembeli Mobil"
            }
        }
        catch (err) {
throw new HttpException("Terjadi Kesalahan", HttpStatus.BAD_REQUEST)
        }
    }

    async updateMobil (id : number, payload: UpdateMobilDto) : Promise<ResponseSuccess> {
    const ketemu = await this.MobilRepository.findOne({
        where : {id}
    })

    if (!ketemu)
    throw new NotFoundException(`Maaf, Pembeli Mobil Dengan Id ${id} Tidak Dapat Ditemukan`)

    const update = await this.MobilRepository.save({...UpdateMobilDto, id : id})
    return {
        status: "Berhasil",
        message: "Berhasil Menambahkan Pembeli Mobil",
        data : update
    }
}

async hapusMobil (id : number) : Promise<ResponseSuccess> {
    const cek = await this.MobilRepository.findOne({where : {id}})

    if(!cek) 
    throw new NotFoundException(`Maaf, Pembeli Dengan Id ${id} Tidak Dapat Ditemukan`)

    await this.MobilRepository.delete(id);

    return {
        status : "Berhasil",
        message : "Berhasil Menghapuskan Pembeli Mobil"
    }

    
}

async bulkCreate (payload: createMobilArrayDto) : Promise<ResponseSuccess> {
    try {
        let berhasil = 0;
        let gagal = 0;
        
        await Promise.all(
            payload.data.map(
                async (item) => {
                    try {
await this.MobilRepository.save(item)
berhasil = berhasil + 1;
                    } catch {
                       gagal = gagal + 1; 
                    }
                }
            )
        )

        return {
            status : "ok",
            message : `Data Berhasil Masuk Sebanyak ${berhasil} Dan Gagal Sebanyak ${gagal }`,
            data: payload
        };

        
    }
     catch {
        throw new HttpException("Ada Kesalahan", HttpStatus.BAD_REQUEST);
    }
}
async HapusBulk (id : number[]) : Promise<ResponseSuccess> {
    try {
        let berhasil = 0;
        let gagal = 0;

        await Promise.all (
            id.map (async (id) => {
                try {
await this.MobilRepository.delete(id)
berhasil = berhasil + 1
                }

                catch {
                    gagal = gagal + 1
                }
            })
        )

        return {
            status : "Berhasil",
            message : `Berhasil Menghapus Pembeli Mobil Sebanyak ${berhasil} User dan Gagal ${gagal} User`
        }
    }
    catch {
throw new HttpException("Ada Kesalahan", HttpStatus.BAD_REQUEST)
    }


}

}
