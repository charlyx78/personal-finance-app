import { Model, Schema, model } from "mongoose";

interface iAccount {
    name: string,
    balance: number,
    user: Schema.Types.ObjectId
}

type AccountModel = Model<iAccount>

export const accountsSchema = new Schema<iAccount, AccountModel>({
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
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true })

export const accountMongoDBModel = model<iAccount, AccountModel>('accounts', accountsSchema)