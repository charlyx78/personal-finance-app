import { Model, Schema, model } from "mongoose";
import { iTransactions } from "../../interfaces/transactions";
import { handleMongoosePostSaveErrors } from "../../middlewares/handleMongoosePostSaveErrors";

type ExpensesModel = Model<iTransactions>

export const expensesSchema = new Schema<iTransactions, ExpensesModel>({
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

expensesSchema.index({ categoryId: 1, date: 1 })
expensesSchema.index({ walletId: 1, date: 1 })

expensesSchema.post('save', handleMongoosePostSaveErrors)

export const expensesMongoDbModel = model<iTransactions, ExpensesModel>('expenses', expensesSchema)