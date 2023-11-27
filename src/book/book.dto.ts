import { OmitType, PickType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, isNotEmpty, IsInt, IsOptional, Length, ValidateNested, Min, Max, IsNotEmpty } from "class-validator";
import { PageRequestDto } from "src/utils/dto/page.dto";
export class BookDto {
    id : number;
    @IsNotEmpty()
    // @Length(4, 10)
    title : string;
    @IsNotEmpty()
    author : string;
    @Min(2003)
    @Max(2023)
    year: number;
}

export class CreateBookDto extends OmitType(BookDto, ["id"]) {}
export class UpdateBookDto extends PickType(BookDto, ["title", "author", "year"]) {}
export class FindBookDto extends PageRequestDto {
    @IsOptional()
    title : string;

    @IsOptional()
    author : string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    from_year : number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    to_year : number;
}

export class createBookArrayDto {
    @IsArray()
    @ValidateNested()
    @Type(() => CreateBookDto)
    data: CreateBookDto[];
  }

  export class deleteBookArrayDto {
    @IsArray()
    data : number[]
  }