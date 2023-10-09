import { OmitType, PickType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import {IsIn, IsArray, IsNotEmpty, Min, Max, ValidateNested, Length, IsString} from 'class-validator' 
import { PageRequestDto } from "src/utils/dto/page.dto";

export class DtonyaRider {
    id : number;

    @IsNotEmpty()
    @IsString()
    nama_pembalap : string;

    @IsNotEmpty()
    @IsIn(["Monster Energy Yamaha Team", "Lenovo Ducati Team", "Pramac Prima Racing Team"], {message: "Harus Pilih Tim Antara Ducati, Yamaha, Honda, Dan Pramac"})
    @IsString()
    tim: string;

    @Min(2016)
    @Max(2023)
    tahun_masuk : number;

    @Min(2016)
    @Max(2023)
    tahun_keluar : number;

    @IsNotEmpty()
    menang : number;

    @IsNotEmpty()
    podium : number;
}

export class buatDtoRider extends OmitType (DtonyaRider, ['id']){}
export class updateDtoRider extends OmitType (DtonyaRider,['id']){}

export class buatArrayDtoRider {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => buatDtoRider)
    data : buatDtoRider[]

}