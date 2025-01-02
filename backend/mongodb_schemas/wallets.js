import mongoose from "mongoose";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors.js";

export const walletsSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        required: true
    },
    balance: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: 1,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
}, { timestamps: true })

walletsSchema.index({ name: 1, userId: 1 }, { unique: true, partialFilterExpression: { status: true } })

walletsSchema.post('save', handleMongoosePostSaveErrors)

export const walletsMongoDBModel = mongoose.model('wallets', walletsSchema)