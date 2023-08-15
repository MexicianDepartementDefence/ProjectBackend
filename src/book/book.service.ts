import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BookService {
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

    createBook(payload: any): { status: string; message: string } {
        console.log('pay', payload)
        const { title, author, year } = payload;

    /*createBook(
        title: string,
        author: string,
        year: number,
    ): {
        status: string;
        message: string;
    }*/ {
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


    }

    updateBook(id: number, payload: any): { status: string, message: string } {
        const {title, author, year} = payload;
        const bookIndex = this.findBookByid(id);
        this.books[bookIndex].title = title;
        this.books[bookIndex].author = author;
        this.books[bookIndex].year = year;


        return {
            status: 'ok',
            message: 'berhasil menupdate Buku'

        }
    }

    deleteBook(id: number) : {status: string; message: string;} {
        const bookIndex = this.findBookByid(id);
        this.books.splice(bookIndex, 1);
return {
    status : 'ok',
    message: "berhasil Menghapus Buku"
}
    }


    findBookByid(id: number) {
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
    }

}
