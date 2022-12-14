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

    async insertCustomer(customer: Customer, creatorRef: string, imgUrl: string): Promise<Customer> {
        const newCustomer = new this.customerModel({ ...customer, createdBy: creatorRef, lastModifiedBy: creatorRef, ...(imgUrl !== '' && { imgUrl: imgUrl }) })
        const result = await newCustomer.save()
        return result
    }

    async updateCustomer(id: string, customer: Customer, modifierRef: string, imgUrl: string): Promise<Customer> {
        const filter = { id: id };
        delete customer.createdBy
        const update = { ...customer, lastModifiedBy: modifierRef, ...(imgUrl !== '' && { imgUrl: imgUrl }) }
        const updatedUser = await this.customerModel.findOneAndUpdate(filter, update, { new: true })
        return updatedUser
    }

    async deleteCustomer(id: string): Promise<Customer> {
        const deletedCustomer = await this.customerModel.findOneAndDelete({ id: id }).exec()
        return deletedCustomer
    }
}