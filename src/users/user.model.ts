import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
})

export interface User extends mongoose.Document {
    username: string,
    password: string,
    isAdmin: boolean,
}