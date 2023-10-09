import { Controller, Body, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMobilDto, UpdateMobilDto, createMobilArrayDto } from './mobil.dto';
import { ResponseSuccess } from 'src/user/interface/respone';
import { MobilService } from './mobil.service';
import { createUserArrayDto } from 'src/user/user.dto';

@Controller('mobil')
export class MobilController {
    constructor (private servisMobil : MobilService) {}
    @Get('detail/:id')
    findOneBook(@Param('id') id: string) {
      return this.servisMobil.DetailMobil(Number(id))
    }
    @Get('/list')
    findAllMobil() {
        return this.servisMobil.getAllMobil()
    }

    @Put('update/:id')
    updateBook(@Param('id') id: string, @Body() payload: UpdateMobilDto) {
      return this.servisMobil.updateMobil(Number(id), payload);
    }

    @Delete('delete/:id')
  deleteBook(@Param('id') id: string) {
    return this.servisMobil.hapusMobil(+id);
  }

  @Post('/create/bulk')
  bulkingMobil(@Body() payload: createMobilArrayDto) {
    return this.servisMobil.bulkCreate(payload);
  }

  @Post('/delete/bulk')
  BulkingHapusMobil(@Body() id : number[]) {
    return this.servisMobil.HapusBulk(id);
  }

  @Post('/create')
  createBook(@Body() payload: CreateMobilDto) {
    return this.servisMobil.createMobil(payload);
  }
}
