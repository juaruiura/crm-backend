import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { Customer } from './customer.model';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCustomers(): Promise<Customer[]> {
        const customers = await this.customersService.getCustomers()
        return customers
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCustomer(@Param('id') id: string): Promise<Customer> {
        const customer = await this.customersService.getCustomer(id)
        return customer
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCustomer(@Body() newCustomer: Customer): Promise<Customer> {
        const insertedCustomer = await this.customersService.insertCustomer(newCustomer)
        return insertedCustomer
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() customer): Promise<Customer> {
        const updatedCustomer = await this.customersService.updateCustomer(id, customer)
        return updatedCustomer
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCustomer(@Param('id') id: string): Promise<Customer> {
        const deletedCustomer = await this.customersService.deleteCustomer(id)
        return deletedCustomer
    }
}
