import mongoose from "mongoose";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors.js";

export const incomesSchema = new mongoose.Schema({
    amount: {
        type: mongoose.Types.Decimal128,
        min: 1,
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        maxlength: 255,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    walletId: {
        type: mongoose.Types.ObjectId,
        ref: 'wallets',
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
}, { timestamps: true })

incomesSchema.index({ categoryId: 1, date: 1 })
incomesSchema.index({ walletId: 1, date: 1 })

incomesSchema.post('save', handleMongoosePostSaveErrors)

export const incomesMongoDbModel = mongoose.model('incomes', incomesSchema)