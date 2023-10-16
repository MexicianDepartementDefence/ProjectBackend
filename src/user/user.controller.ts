import { Controller, Get, Body, Param, Delete, Put, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';


@Controller('user')
export class UserController {
    constructor(private userserivce : UserService){}
    @Get('list')
    getAllUsers(){
        return this.userserivce.getAllUser()
    }
    @Put("update/:id")
    updateUsers(@Param('id') id: string, @Body() payload: UpdateUserDto){
return this.userserivce.Updateuser(Number(id), payload);
    }
@Post('create')
createUsers(@Body() payload: CreateUserDto){
    return this.userserivce.createUsers(payload)
}
 @Delete('delete/:id')
deleteUsers(@Param('id') id: string){
    return this.userserivce.deleteUser(Number(id))
}

@Get('detail/:id')
findOneBook(@Param('id') id: string){
    return this.userserivce.getOneUser(Number(id))
}
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
