import * as mongoose from 'mongoose'

export const CustomerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    imgUrl: String,
    createdBy: String,
    lastModifiedBy: String,
})

export interface Customer extends mongoose.Document {
    id: string,
    name: string,
    surname: string,
    imgUrl: string,
    createdBy: string,
    lastModifiedBy: string,
}