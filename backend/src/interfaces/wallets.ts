import { Schema } from "mongoose"

export interface iWallets {
    _id: Schema.Types.ObjectId,
    name: string,
    balance: Schema.Types.Decimal128,
    userId: Schema.Types.ObjectId,
    status?: boolean,
    createdAd: Date,
    updatedAt: Date
}

export interface iWalletsInput {
    name: string,
    balance: number,
    userId: string
}

export interface iWalletsOutput {
    _id: Schema.Types.ObjectId,
    name: string,
    balance: Schema.Types.Decimal128,
}