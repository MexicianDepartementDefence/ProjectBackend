import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query } from '@nestjs/common';

@Controller('latihan') // Jika Ingin Melihat Data Yang Ditulis Maka Tulis Localhost:Kode/latihan
export class LatihanController {
    @Get()
    findAll(@Query() query: any){
        return {
            query: query
            };
    }

    @Post ()
    create(@Body('name') name: string, @Body('Sekolah') sekolah: string, @Body('umur') umur: number, @Body('alumni') alumni: string){
        console.log('nama: ', name)
        console.log('sekolah: ', sekolah)
        console.log('umur: ', umur)
        console.log('alumni: ', alumni)
        return {
            name: name,
            sekolah: sekolah,
            umur: umur,
            alumni: alumni,
        }

        
        
    }

    @Put ('update/:id/:name')
    update(@Body() payload : any, @Param('id') id: string, @Param('name') name: string){
return {
    id: id,
    name: name,
    payload : payload
}
    }

    @Patch()
    patch(){
return 'Latihan Menggunakan Method Patch'
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number, @Query() query: any){
        console.log(query)
        return {
            id: id,
            method: 'delete',
            query: query
        }
    }
}
