import { Controller, Get, Param, Body, Post, Delete, Patch, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { RiderService } from './rider.service';
import { buatDtoRider } from './rider.dto';

@Controller('rider')
export class RiderController {
    constructor (private rider: RiderService) {}

    @Get("/list")
    DapatkanSemuaRider ()
    {return this.rider.getAllRider()}

    @Get("detail/:id")
    DapatkanDetailRider (@Param('id') id : String) {
        return this.rider.DapatkanDetailRider(Number(id))
    }

    @Post('buat')
    BikinDetailRider (@Body() payload : buatDtoRider) {
        return this.rider.buatDataRider(payload)
    }

    @Delete('/delete/bulk') 
    HapusBanyakRider (@Body() id : number[])
    {
return this.rider.deleteBulk(id)
    }
 }
