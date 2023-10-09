import { Controller, Get, Body, Post, Param, Put, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto, createBookArrayDto } from './book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('book')
export class BookController {
    constructor(private bookservice: BookService) {}
    @Get('list')
    getAllBook(@Pagination() findbookdto : findbookDto) {
        return this.bookservice.getAllBooks();
    }
@Post('create')
createBook(@Body() payload: CreateBookDto){
    return this.bookservice.createBook(payload)
}

@Get('detail/:id')
findOneBook(@Param('id') id: string) {
    return this.bookservice.getDetail(Number(id));
}

@Put('update/:id')
updateBook(@Param('id') id: string, @Body() payload:UpdateBookDto){
    return this.bookservice.updateBook(Number(id), payload);
}

@Delete('delete/:id')
deleteBook(@Param('id') id: string){
return this.bookservice.HapusBuku(+id);
}

@Post("create/bulk")
createbulk(payload : createBookArrayDto) {
    return this.bookservice.bulkCreate(payload);
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

