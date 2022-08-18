import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        const users = await this.usersService.getUsers()
        return users
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        const user = await this.usersService.getUser(id)
        return user
    }

    @Post()
    async createUser(@Body() newUser: User): Promise<User> {
        const insertedUser = await this.usersService.insertUser(newUser)
        return insertedUser
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user): Promise<User> {
        const updatedUser = await this.usersService.updateUser(id, user)
        return updatedUser
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        const deletedUser = await this.usersService.deleteUser(id)
        return deletedUser
    }
}
