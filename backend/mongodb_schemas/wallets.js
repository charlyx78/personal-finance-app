import mongoose from "mongoose";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors.js";

export const walletsSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 20,
        required: true
    },
    balance: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: 1,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true })

walletsSchema.index({ name: 1, user: 1 }, { unique: true })

walletsSchema.post('save', handleMongoosePostSaveErrors)

export const walletsMongoDBModel = mongoose.model('wallets', walletsSchema)