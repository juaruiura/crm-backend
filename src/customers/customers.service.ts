import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Customer } from "./customer.model";

@Injectable()
export class CustomersService {

    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) { }

    async getCustomers(): Promise<Customer[]> {
        const customers = await this.customerModel.find().exec()
        return customers
    }

    async getCustomer(id: string): Promise<Customer> {
        const customer = await this.customerModel.findOne({ id: id }).exec()
        return customer
    }

    async insertCustomer(customer: Customer): Promise<Customer> {
        const newCustomer = new this.customerModel({ ...customer })
        const result = await newCustomer.save()
        return result
    }

    async updateCustomer(id: string, customer: Customer): Promise<Customer> {
        const updatedCustomer = await this.getCustomer(id)
        Object.assign(updatedCustomer, customer)
        updatedCustomer.save()
        return updatedCustomer
    }

    async deleteCustomer(id: string): Promise<Customer> {
        const deletedCustomer = await this.getCustomer(id)
        deletedCustomer.delete()
        return deletedCustomer
    }
}