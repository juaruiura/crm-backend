import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path = require('path');

import { Customer } from './customer.model';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

export const storage = {
    storage: diskStorage({
        destination: './uploads/profile_images',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
            const extension: string = path.parse(file.originalname).ext

            cb(null, `${filename}${extension}`)
        }
    })
}

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
    @UseInterceptors(FileInterceptor('img', storage))
    @Post()
    async createCustomer(@Body() newCustomer: Customer, @Request() req, @UploadedFile() img): Promise<Customer> {
        const insertedCustomer = await this.customersService.insertCustomer(newCustomer, req.user._id, img ? img.path : '')
        return insertedCustomer
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('img', storage))
    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() update: Customer, @Request() req, @UploadedFile() img): Promise<Customer> {
        const updatedCustomer = await this.customersService.updateCustomer(id, update, req.user._id, img ? img.path : '')
        return updatedCustomer
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCustomer(@Param('id') id: string): Promise<Customer> {
        const deletedCustomer = await this.customersService.deleteCustomer(id)
        return deletedCustomer
    }
}
