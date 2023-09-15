import { OmitType, PickType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, Min, Max, Length, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UserDto {
    id: number;
    @IsNotEmpty()
    nama: string;
    @IsNotEmpty()
    email: string;
    @IsInt()
    @Min(13)
    @Max(52)
    umur: number;
    @IsNotEmpty()
    tanggal_lahir: string;
    @IsNotEmpty()
    status: string
}

export class CreateUserDto extends OmitType(UserDto, ["id"]) {}
export class UpdateUserDto extends PickType (UserDto, ["email", "nama", "status", "tanggal_lahir", "umur"]) {}

export class createUserArrayDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    data: CreateUserDto[];
  }