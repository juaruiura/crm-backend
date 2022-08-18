import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
})

export interface User extends mongoose.Document {
    id: string,
    isAdmin: boolean,
}