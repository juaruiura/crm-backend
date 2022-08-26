import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';

import { User } from "./user.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec()
        return users
    }

    async getUser(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username: username }).exec()
        return user
    }

    async insertUser(user: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const newUser = new this.userModel({ ...user, password: hashedPassword })
        const savedUser = await newUser.save()
        return savedUser
    }

    async updateUser(username: string, update: User): Promise<User> {
        const filter = { username: username }
        if (update.password && update.password !== '') {
            update.password = await bcrypt.hash(update.password, 10)
        }
        const updatedUser = await this.userModel.findOneAndUpdate(filter, update, { new: true })
        return updatedUser
    }

    async deleteUser(username: string): Promise<User> {
        const deletedUser = await this.userModel.findOneAndDelete({ username: username }).exec()
        return deletedUser
    }
}