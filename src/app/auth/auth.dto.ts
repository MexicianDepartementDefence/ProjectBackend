import { PickType, OmitType } from "@nestjs/mapped-types";
import { IsInt, IsArray, IsString, IsNotEmpty, Length, MinLength, IsEmail} from "class-validator";

export class UserDto {
    @IsInt()
    id : number;

    @IsString()
    nama : string;

    avatar : string;

    @IsString()
    @IsEmail()
    email : string;

    @IsString()
    @MinLength(10)
    password : string;

    @IsString()
    refresh_token : string;

@IsString()
    role : string
}

export class DtoRegister extends PickType(UserDto, ["nama", "email", "password"]) {}