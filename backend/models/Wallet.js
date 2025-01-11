import { walletsMongoDbModel } from "../mongodb_schemas/wallets.js"

export class Wallet {
    async create({ input, userId }) {
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
                { id: id, userId: userId, status: true },
                { name: 1, balance: 1 }
            )
            return wallet
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update({ input, id }) {
        const {
            name,
            amount
        } = input

        try {
            const updatedWallet = await walletsMongoDbModel.findByIdAndUpdate(id, {
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

    async delete({ id }) {
        try {
            const deletedWallet = await walletsMongoDbModel.findByIdAndUpdate(id, {
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