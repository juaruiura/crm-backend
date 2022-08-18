import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from "./user.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec()
        return users
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userModel.findOne({ id: id }).exec()
        return user
    }

    async insertUser(user: User): Promise<User> {
        const newUser = new this.userModel({ ...user })
        const result = await newUser.save()
        return result
    }

    async updateUser(id: string, user: User): Promise<User> {
        const updatedUser = await this.getUser(id)
        Object.assign(updatedUser, user)
        updatedUser.save()
        return updatedUser
    }

    async deleteUser(id: string): Promise<User> {
        const deletedUser = await this.getUser(id)
        deletedUser.delete()
        return deletedUser
    }
}