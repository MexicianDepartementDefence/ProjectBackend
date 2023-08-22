import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseSuccess } from './interface/respone';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
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

    getAllUsers(): {
        id?: number;
        nama: string;
        email: string;
        umur: number,
        tanggal_lahir: string,
        status: string

    }[] {
        return this.users;
    }

    createUsers(payload: CreateUserDto): ResponseSuccess {
        const { nama, email, umur, tanggal_lahir, status } = payload;

        this.users.push({
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
        }
    } // Membuat User

    findUserbyid(id: number) {
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
} // Mengambil Detail Dari User Seseorang

updateUsers(id : number, payload: UpdateUserDto) : ResponseSuccess {
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
} // Update User Dari Postman

deleteUsers (id : number) : ResponseSuccess {
    const UserIndex = this.findUserbyid(id);
    this.users.splice (UserIndex, 1);
    return {
        status: "Berhasil",
        message: "berhasil Menghapus User"
    }
}




}
