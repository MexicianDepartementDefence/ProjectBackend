import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseSuccess, ResponsePagination } from 'src/interface/respone';
import { CreateBookDto, FindBookDto, UpdateBookDto, createBookArrayDto, deleteBookArrayDto } from './book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Between, Like, Not, Repository } from 'typeorm';
import BaseResponse from 'src/utils/Response/base.response';


@Injectable()
export class BookService extends BaseResponse {
    constructor (
        @InjectRepository(Book) private readonly bookRepository : Repository<Book>
    ) {
        super();
    }
   /* private books: {
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
    }*/

    async getAllBooks(query: FindBookDto) : Promise<ResponsePagination> {
        console.log('uqwey', query)
        const {page, pageSize, limit, title, author, from_year, to_year} = query;
        const total = await this.bookRepository.count();

        const filter: {
            [key: string] :any;
        } = {};

        if (title) {
filter.title = Like(`%${title}%`)
        }
if (author) {
    filter.author = Like(`%${author}%`)
}

if (from_year && to_year) {
    filter.year = Between(from_year, to_year)
}

if (from_year && !!to_year === false) {
    filter.year = Between(from_year, to_year)
}

        const result = await this.bookRepository.find({
            where: filter,
            skip: limit,
            take: pageSize
        })

       

        return this._pagination('Sip', result,  total, page, pageSize)
    }

    async createBook(payload : CreateBookDto) : Promise<ResponseSuccess> {
        const {title, author, year} = payload;
        try {
            const SimpanBuku = await this.bookRepository.save({
                title : title,
                author : author,
                year: year
            });
            return this._success('Sip', SimpanBuku);
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
    try {
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

        return this._success("Sip", payload)
    } catch {
throw new HttpException("Terjadi Kesalahan", HttpStatus.BAD_REQUEST)
    }
}


async bulkDelete (payload: deleteBookArrayDto) : Promise<ResponseSuccess> {
try {
    let berhasil = 0;
    let gagal = 0
    await Promise.all (
        payload.data.map(
            async (data) => {
                try {
await this.bookRepository.delete(data)
berhasil = berhasil + 1
                }
                catch {
gagal = gagal + 1
                }
            }
        )
    )

    return this._success(`Berhasil Menghapus Buku Sebanyak ${berhasil} Kali Dan Gagal Sebanyak ${gagal} Kali`)
}
catch {
    throw new HttpException("Terjadi Kesalahan", HttpStatus.BAD_REQUEST)
}
}
}
