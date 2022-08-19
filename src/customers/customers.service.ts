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

    async insertCustomer(customer: Customer, creatorUsername: string): Promise<Customer> {
        const newCustomer = new this.customerModel({ ...customer, createdBy: creatorUsername, lastModifiedBy: creatorUsername })
        const result = await newCustomer.save()
        return result
    }

    async updateCustomer(id: string, customer: Customer, modifierUsername: string): Promise<Customer> {
        const filter = { id: id };
        const update = { ...customer, lastModifiedBy: modifierUsername }
        const updatedUser = await this.customerModel.findOneAndUpdate(filter, update, { new: true })
        return updatedUser
    }

    async deleteCustomer(id: string): Promise<Customer> {
        const deletedCustomer = await this.customerModel.findOneAndDelete({ id: id }).exec()
        return deletedCustomer
    }
}