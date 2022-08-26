import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers(@Request() req): Promise<User[]> {
        const { isAdmin } = await this.usersService.getUser(req.user.username)
        if (!isAdmin) throw new ForbiddenException()

        const users = await this.usersService.getUsers()
        return users
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string, @Request() req): Promise<User> {
        const { isAdmin } = await this.usersService.getUser(req.user.username)
        if (!isAdmin) throw new ForbiddenException()

        const user = await this.usersService.getUser(id)
        return user
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async createUser(@Body() newUser: User, @Request() req): Promise<User> {
        const { isAdmin } = await this.usersService.getUser(req.user.username)
        if (!isAdmin) throw new ForbiddenException()

        const insertedUser = await this.usersService.insertUser(newUser)
        return insertedUser
    }

    @UseGuards(JwtAuthGuard)
    @Put(':username')
    async updateUser(@Param('username') username: string, @Body() update: User, @Request() req): Promise<User> {
        const { isAdmin } = await this.usersService.getUser(req.user.username)
        if (!isAdmin) throw new ForbiddenException()

        const updatedUser = await this.usersService.updateUser(username, update)
        return updatedUser
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string, @Request() req): Promise<User> {
        const { isAdmin } = await this.usersService.getUser(req.user.username)
        if (!isAdmin) throw new ForbiddenException()

        const deletedUser = await this.usersService.deleteUser(id)
        return deletedUser
    }
}
