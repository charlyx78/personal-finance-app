import { walletsMongoDBModel } from "../mongodb_schemas/wallets.js"

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
            const walletCreated = await walletsMongoDBModel.create(newWallet)
            return walletCreated
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async read({ userId }) {
        try {
            const wallets = await walletsMongoDBModel.find(
                { userId: userId, status: true },
                { name: 1, balance: 1 }
            )
            return wallets
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update({ input }) {
        const {
            id,
            name,
            amount
        } = input

        try {
            const updatedWallet = await walletsMongoDBModel.findByIdAndUpdate(id, {
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
            const deletedWallet = await walletsMongoDBModel.findByIdAndUpdate(id, {
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