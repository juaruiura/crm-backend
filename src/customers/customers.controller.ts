import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
    @Get()
    getCustomers(): string {
        return "Return all the customers in the database"
    }

    @Get(':id')
    getCustomer(@Param('id') id: string): string {
        return "Return an specific customer"
    }

    @Post()
    createCustomer(@Body() customer): string {
        return "Create a new customer"
    }

    @Put(':id')
    updateCustomer(@Param('id') id: string, @Body() customer): string {
        return "Update an existing customer"
    }

    @Delete(':id')
    deleteCustomer(@Param('id') id: string): string {
        return "Delete an existing customer"
    }
}
