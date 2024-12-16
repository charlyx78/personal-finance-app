import mongoose from "mongoose";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors.js";

export const accountsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        min: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        require: true
    }
}, { timestamps: true })

accountsSchema.index({ name: 1, user: 1 }, { unique: true })

accountsSchema.post('save', handleMongoosePostSaveErrors)

export const accountsMongoDBModel = mongoose.model('accounts', accountsSchema)