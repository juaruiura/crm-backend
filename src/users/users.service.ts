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
        const newUser = new this.userModel({ ...user, isAdmin: false })
        const savedUser = await newUser.save()
        return savedUser
    }

    async updateUser(id: string, user: User): Promise<User> {
        const filter = { id: id };
        const update = { username: user.username, password: user.password }
        const updatedUser = await this.userModel.findOneAndUpdate(filter, update, { new: true })
        return updatedUser
    }

    async deleteUser(id: string): Promise<User> {
        const deletedUser = await this.userModel.findOneAndDelete({ id: id }).exec()
        return deletedUser
    }
}