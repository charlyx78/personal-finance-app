import {Model, Schema, model} from "mongoose";
import { iTransactions } from "../../interfaces/transactions";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors";

type IncomesModel = Model<iTransactions>

export const incomesSchema = new Schema<iTransactions, IncomesModel>({
    amount: {
        type: Schema.Types.Decimal128,
        min: 1,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    walletId: {
        type: Schema.Types.ObjectId,
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

export const incomesMongoDbModel = model<iTransactions, IncomesModel>('incomes', incomesSchema)