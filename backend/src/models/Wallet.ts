import { walletsMongoDbModel } from "../schemas/mongodb/wallets"
import { Schema } from "mongoose"
import { iWallets } from "../schemas/mongodb/wallets"
import { ModelBase } from "./ModelBase"

export class Wallet extends ModelBase<iWallets> {

    async create(userId: Schema.Types.ObjectId, input: iWallets) {
        const {
            name,
            balance
        } = input

        const newWallet = {
            name: name,
            balance: balance,
            userId: userId
        }

        try {
            const walletCreated = await walletsMongoDbModel.create(newWallet)
            return walletCreated
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async read(userId: Schema.Types.ObjectId) {
        try {
            const wallets = await walletsMongoDbModel.find(
                { userId: userId, status: true },
                { name: 1, balance: 1 }
            )

            return wallets
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async readById(userId: Schema.Types.ObjectId, id: Schema.Types.ObjectId) {
        try {
            const wallet = await walletsMongoDbModel.findOne(
                { userId: userId, _id: id, status: true },
                { name: 1, balance: 1 }
            )
            return wallet
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async update(userId: Schema.Types.ObjectId, id: Schema.Types.ObjectId, input: iWallets) {
        const {
            name,
        } = input

        try {
            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId: userId, _id: id, status: true }, {
                name,
            }, {
                new: true,
                projection: {
                    name: 1,
                    balance: 1
                }
            })

            return updatedWallet
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async delete(userId: Schema.Types.ObjectId, id: Schema.Types.ObjectId) {
        try {
            const deletedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId: userId, _id: id, status: true }, {
                status: false
            }, {
                new: true,
                projection: {
                    name: 1,
                    balance: 1,
                    status: 1
                }
            })

            return deletedWallet
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}