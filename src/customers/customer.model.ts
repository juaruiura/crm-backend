import * as mongoose from 'mongoose'

export const CustomerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    photo: String,
    createdBy: String,
    lastModifiedBy: String,
})

export interface Customer extends mongoose.Document {
    id: string,
    name: string,
    surname: string,
    photo: string,
    createdBy: string,
    lastModifiedBy: string,
}