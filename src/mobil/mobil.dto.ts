import { OmitType, PickType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import {IsInt, IsString, Min, Max, IsNotEmpty, IsArray, ValidateNested, IsIn} from "class-validator";
import { PageRequestDto } from "src/utils/dto/page.dto";

export class MobilDto {
    id : number;
@IsNotEmpty()
nama : string;


@IsIn(["Honda", "Toyota", "Suzuki"], {message: "Anda Harus Masukkan Honda, Toyota, Atau Suzuki"})
@IsString()
    merek_mobil : string;
@IsIn(["CRV", "BRV", "HRV"], {message : "Mobil Ini Hanya Untuk Merek Honda"})
@IsIn(["Avanza", "Innova", "Raize"], {message : "Mobil Ini Hanya Untuk Merek Toyota"})
@IsIn(["Ertiga", "XL7", "Baleno"], {message : "Mobil Ini Hanya Untuk Merek Suzuki"})
@IsString()
    tipe_mobil : string;
    @Min(150000000)
    @Max(400000000)
    harga : number;
    @Min(2017)
    @Max(2023)
    tahun : number;
    
}

export class CreateMobilDto extends OmitType(MobilDto, ['id']) {}
export class UpdateMobilDto extends OmitType(MobilDto, ['id']) {}

export class createMobilArrayDto {
    @IsArray()
    @ValidateNested({each : true})
    @Type(() => CreateMobilDto)
    data : CreateMobilDto[]

}