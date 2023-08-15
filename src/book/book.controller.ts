import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private bookservice: BookService) {}
    @Get('list')
    getAllBook() {
        return this.bookservice.getAllBooks();
    }
@Post('create')
createBook(@Body() payload: any){
    return this.bookservice.createBook(payload)
}

@Get('detail/:id')
findOneBook(@Param('id') id: string) {
    return this.bookservice.getDetail(Number(id));
}

@Put('update/:id')
updateBook(@Param('id') id: string, @Body() payload:any){
    return this.bookservice.updateBook(Number(id), payload);
}

@Delete('delete/:id')
deleteBook(@Param('id') id: string){
return this.bookservice.deleteBook(+id);
}
}

const array = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
];

