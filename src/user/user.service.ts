import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseSuccess } from './interface/respone';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import BaseResponse from 'src/utils/Response/base.response';

@Injectable()
export class UserService extends BaseResponse {
constructor(
    @InjectRepository(User) private readonly userRepository : Repository<User>
) {super()}
 
    private users: {
        id?: number,
        nama: string,
        email: string,
        umur: number,
        tanggal_lahir: string,
        status: string
    }[] = [
            {
                id: 1,
                nama: "Faisal Achmad",
                email: "faisal41780@gmail.com",
                umur: 16,
                tanggal_lahir: "02 April 2007",
                status: "Siswa"

            }
        ];

    /*getAllUsers(): {
        id?: number;
        nama: string;
        email: string;
        umur: number,
        tanggal_lahir: string,
        status: string

    }[] {
        return this.users;
    }*/

    async createUsers(payload: CreateUserDto): Promise<ResponseSuccess> {
        const { nama, email, umur, tanggal_lahir, status } = payload;
 try {
    const SimpanUser = await this.userRepository.save({
        nama: nama,
        email: email,
        umur: umur,
        tanggal_lahir: tanggal_lahir,
        status: status   
    });
    return {
        status: "Success",
        message: "Berhasil Menambahkan User",
        data : SimpanUser
    };
 } catch (err) {
    throw new HttpException("Ada Kesalahan", HttpStatus.BAD_REQUEST);
 }

        /*this.users.push({
            id: new Date().getTime(),
            nama: nama,
            email: email,
            umur: umur,
            tanggal_lahir: tanggal_lahir,
            status: status
        });
        return {
            status: 'Berhasil',
            message: "Berhasil Menambahkan User Anda"
        }*/
    } // Membuat User

    /*findUserbyid(id: number) {
        const UserIndex = this.users.findIndex((users) => users.id === id)
        if (UserIndex === -1) {
            throw new NotFoundException("Maaf, User Anda Belum Ditemukan")
        }

        return UserIndex
    } // Menambahkan Index Dari Sebuah ID

    getDetail(id: number): {
        id? : number
        nama: string;
        email: string;
        umur: number;
        tanggal_lahir: string;
        status: string;
    } {
        const UserIndex =  this.findUserbyid(id);
        const user = this.users[UserIndex];

        return user;
}*/ // Mengambil Detail Dari User Seseorang

/*updateUsers(id : number, payload: UpdateUserDto) : ResponseSuccess {
const {nama, email, umur, tanggal_lahir,status} = payload;
const UserIndex = this.findUserbyid(id);
this.users[UserIndex].nama = nama;
this.users[UserIndex].email = email;
this.users[UserIndex].umur = umur;
this.users[UserIndex].tanggal_lahir = tanggal_lahir;
this.users[UserIndex].status = status;


    return {
        status : "Berhasil",
        message : "Berhasil Mengupdate User"
    }
} */ // Update User Dari Postman

/*deleteUsers (id : number) : ResponseSuccess {
    const UserIndex = this.findUserbyid(id);
    this.users.splice (UserIndex, 1);
    return {
        status: "Berhasil",
        message: "berhasil Menghapus User"
    }
}*/

async getAllUser() : Promise<ResponseSuccess> {
    const hasil = await this.userRepository.find();
    return this._success("Sip", hasil)
}

async deleteUser(id : number) : Promise<ResponseSuccess> {
    const hasil = await this.userRepository.findOne(
        {where: {id}}
    );

    await this.userRepository.delete(id);

    if(!hasil) throw new HttpException("Ada Kesalahan User", HttpStatus.BAD_REQUEST)

    return this._success("Sip")
}

async Updateuser (id: number, payload : UpdateUserDto) : Promise<ResponseSuccess> {
    const hasil = await this.userRepository.findOne({where: {id}})

    const update = await this.userRepository.save({...payload, id: id})

    if(!hasil) throw new NotFoundException(`Ada Kesalahan, Tidak Dapat Id ${id}`)

    return this._success("Sip", update)
}

async getOneUser (id :number) : Promise<ResponseSuccess> {
    const hasil = await this.userRepository.findOne({where: {id}})
    if (hasil === null) throw new NotFoundException(`Ada Kesalahan, Tidak Dapat Id ${id}`)

    return this._success("Sip", hasil)
}



}
