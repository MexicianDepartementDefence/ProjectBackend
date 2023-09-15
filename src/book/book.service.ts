import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseSuccess } from 'src/user/interface/respone';
import { CreateBookDto, UpdateBookDto, createBookArrayDto } from './book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Not, Repository } from 'typeorm';


@Injectable()
export class BookService {
    constructor (
        @InjectRepository(Book) private readonly bookRepository : Repository<Book>
    ) {}
    private books: {
        id?: number;
        title: string;
        author: string;
        year: number;
    }[] = [
            {
                id: 1,
                title: 'HTML CSS',
                author: 'Ihsananbuhanifah',
                year: 2023
            },
        ];

    getAllBooks(): {
        id?: number;
        title: string;
        author: string;
        year: number;
    }[] {
        return this.books;
    }

    async createBook(payload : CreateBookDto) : Promise<ResponseSuccess> {
        const {title, author, year} = payload;
        try {
            const SimpanBuku = await this.bookRepository.save({
                title : title,
                author : author,
                year: year
            });
            return {
                status : "Success",
                message : "Berhasil Menambahkan Buku"
            }
        } catch (err) {
throw new HttpException("Ada Kesalahan", HttpStatus.BAD_REQUEST)
        }
    }

    /*createBook(payload: any): { status: string; message: string } {
        console.log('pay', payload)
        const { title, author, year } = payload;

    /*createBook(
        title: string,
        author: string,
        year: number,
    ): {
        status: string;
        message: string;
    } {
            this.books.push(
                {
                    id: new Date().getTime(),
                    title: title,
                    author: author,
                    year: year,
                });

            return {
                status: 'Success',
                message: 'Berhasil menambahkan Buku'
            };


        }


    }*/

    async updateBook(id: number, payload: UpdateBookDto): Promise<ResponseSuccess>{
        const updateBuku = await this.bookRepository.findOne({where: {
            id,
        }})

        if (!updateBuku) throw new NotFoundException(`Buku Dengan id Nomor ${id} Tidak Ditemukan`)

        await this.bookRepository.save({...payload, id:id})


        return {
            status: 'ok',
            message: 'berhasil menupdate Buku'

        }
    }

    /*deleteBook(id: number) : {status: string; message: string;} {
        const bookIndex = this.findBookByid(id);
        this.books.splice(bookIndex, 1);
return {
    status : 'ok',
    message: "berhasil Menghapus Buku"
}
    }*/


    /*findBookByid(id: number) {
        const bookIndex = this.books.findIndex((books) => books.id === id);
        if (bookIndex === -1) {
            throw new NotFoundException(`Buku Dengan ${id} Tidak Ditemukan`)
        }

        return bookIndex;
    }

    getDetail(id: number): {
        id?: number;
        title: string;
        author: string;
        year: number;
    } {
        const bookIndex = this.findBookByid(id);
        const book = this.books[bookIndex];
        return book;
    }*/

async getDetail (id : number) : Promise<ResponseSuccess> {
    const detailBook = await this.bookRepository.findOne ({where : {
        id,
    }});
    if (detailBook === null) {
        throw new NotFoundException(`Buku Dengan id ${id} Tidak Ditemukan`)
    }
    return {
        status : "Success",
        message : "Detail Buku Ditemukan",
        data: detailBook
    }
}

async HapusBuku (id: number) : Promise<ResponseSuccess> {
    const Cek = await this.bookRepository.findOne({where : {
        id,
    }})
    if (!Cek) throw new NotFoundException (`Buku Denga id ${id} tidak ditemukan`);
    await this.bookRepository.delete(id);
return {
    status : "Success",
    message : "Sukses Menghapus Buku"

}
}

async bulkCreate (payload: createBookArrayDto) : Promise<ResponseSuccess> {
    return {
        status : "ok",
        message : "Data Berhasil Masuk"
    }
    /*try {
        let berhasil = 0;
        let gagal = 0
        await Promise.all(
            payload.data.map(
                async (data) => {
                    try {
                        await this.bookRepository.save(data);
                        berhasil += 1;
                    }
                    catch {
gagal += 1;
                    }
                }
            )
        )

        return this.
    } catch {

    }*/
}

}
