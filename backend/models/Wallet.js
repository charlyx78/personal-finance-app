import { walletsMongoDbModel } from "../mongodb_schemas/wallets.js"

export class Wallet {
    async create({ userId, input }) {
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
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async read({ userId }) {
        try {
            const wallets = await walletsMongoDbModel.find(
                { userId: userId, status: true },
                { name: 1, balance: 1 }
            )
            return wallets
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async readById({ userId, id }) {
        try {
            const wallet = await walletsMongoDbModel.findOne(
                { userId: userId, id: id, status: true },
                { name: 1, balance: 1 }
            )
            return wallet
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update({ userId, id, input }) {
        const {
            name,
            amount
        } = input

        try {
            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId: userId, id: id, status: true }, {
                name,
                $inc: { balance: amount }
            }, {
                new: true,
                projection: {
                    name: 1,
                    balance: 1
                }
            })

            return updatedWallet
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete({ userId, id }) {
        try {
            const deletedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId: userId, id: id, status: true }, {
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
        } catch (error) {
            throw new Error(error.message);
        }
    }
}