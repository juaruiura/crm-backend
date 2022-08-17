import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getUsers(): string {
        return "Return all the users in the database"
    }

    @Get(':id')
    getUser(@Param('id') id: string): string {
        return "Return an specific user"
    }

    @Post()
    createUser(@Body() user): string {
        return "Create a new user"
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user): string {
        return "Update an existing user"
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): string {
        return "Delete an existing user"
    }

    //Need further info of the difference between updating a user and changing its admin status
    @Put('admin/:id')
    changeUserAdminStatus(@Param('id') id: string, @Body() user): string {
        return "Update an existing user admin status"
    }
}
