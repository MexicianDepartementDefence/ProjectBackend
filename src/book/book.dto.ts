import { OmitType, PickType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, isNotEmpty, isInt, IsOptional, Length, ValidateNested, Min, Max, IsNotEmpty } from "class-validator";
export class BookDto {
    id : number;
    @IsNotEmpty()
    title : string;
    @IsNotEmpty()
    author : string;
    @Min(2003)
    @Max(2023)
    year: number;
}

export class CreateBookDto extends OmitType(BookDto, ["id"]) {}
export class UpdateBookDto extends PickType(BookDto, ["title", "author", "year"]) {}


export class createBookArrayDto {
    @IsArray()
    @ValidateNested()
    @Type(() => CreateBookDto)
    data: CreateBookDto[];
  }