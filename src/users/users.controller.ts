import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers(): Promise<User[]> {
        const users = await this.usersService.getUsers()
        return users
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        const user = await this.usersService.getUser(id)
        return user
    }

    @UseGuards(JwtAuthGuard)
    @Post('signup')
    async createUser(@Body() newUser: User): Promise<User> {
        const insertedUser = await this.usersService.insertUser(newUser)
        return insertedUser
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
        const updatedUser = await this.usersService.updateUser(id, user)
        return updatedUser
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        const deletedUser = await this.usersService.deleteUser(id)
        return deletedUser
    }
}
