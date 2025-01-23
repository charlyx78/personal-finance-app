import { Schema } from 'mongoose'

export interface iTransactions {
    _id: Schema.Types.ObjectId,
    amount: Schema.Types.Decimal128,
    categoryId: Schema.Types.ObjectId,
    date: Date,
    notes?: string,
    userId: Schema.Types.ObjectId,
    walletId: Schema.Types.ObjectId,
    status?: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface iTransactionsInput {
    amount: string,
    categoryId: string,
    date: Date,
    notes?: string,
    userId: string,
    walletId: string,
}

export interface iTransactionsOutput {
    _id: Schema.Types.ObjectId,
    amount: Schema.Types.Decimal128,
    categoryId: Schema.Types.ObjectId,
    date: Date,
    notes?: string,
    walletId: Schema.Types.ObjectId,
    updatedAt: Date
}

export enum iTransactionMovements {
    INCOME = "income",
    EXPENSE = "expense"
}