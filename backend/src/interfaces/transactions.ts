import { Schema } from 'mongoose'

export interface iTransactions {
    amount: Schema.Types.Decimal128,
    categoryId: Schema.Types.ObjectId,
    date: Date,
    notes?: string,
    userId: Schema.Types.ObjectId,
    walletId: Schema.Types.ObjectId,
    status?: boolean
}

export enum iTransactionMovements {
    INCOME = "income",
    EXPENSE = "expense"
}