import { Controller, Get, Body, Param, Delete, Put, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';


@Controller('user')
export class UserController {
    constructor(private userserivce : UserService){}
    @Get('list')
    getAllUsers(){
        return this.userserivce.getAllUsers();
    }
   /* @Put("update/:id")
    updateUsers(@Param('id') id: string, @Body() payload: UpdateUserDto){
return this.userserivce.updateUsers(Number(id), payload);
    }*/
@Post('create')
createUsers(@Body() payload: CreateUserDto){
    return this.userserivce.createUsers(payload)
}
/* @Delete('delete/:id')
deleteUsers(@Param('id') id: string){
    return this.userserivce.deleteUsers(+id);
}

@Get('detail/:id')
findOneBook(@Param('id') id: string){
    return this.userserivce.getDetail(+id);
}*/
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
    {
        id: 4
    }
]
