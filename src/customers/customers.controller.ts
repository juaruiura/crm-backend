import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Customer } from './customer.model';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Get()
    async getCustomers(): Promise<Customer[]> {
        const customers = await this.customersService.getCustomers()
        return customers
    }

    @Get(':id')
    async getCustomer(@Param('id') id: string): Promise<Customer> {
        const customer = await this.customersService.getCustomer(id)
        return customer
    }

    @Post()
    async createCustomer(@Body() newCustomer: Customer): Promise<Customer> {
        const insertedCustomer = await this.customersService.insertCustomer(newCustomer)
        return insertedCustomer
    }

    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() customer): Promise<Customer> {
        const updatedCustomer = await this.customersService.updateCustomer(id, customer)
        return updatedCustomer
    }

    @Delete(':id')
    async deleteCustomer(@Param('id') id: string): Promise<Customer> {
        const deletedCustomer = await this.customersService.deleteCustomer(id)
        return deletedCustomer
    }
}
