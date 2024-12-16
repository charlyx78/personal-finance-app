import { accountsMongoDBModel } from "../mongodb_schemas/accounts.js"

export class Account {
    async create({ input, userId }) {
        const {
            name,
            balance
        } = input

        const newAccount = {
            name: name,
            balance: balance,
            user: userId
        }

        try {
            const accountCreated = await accountsMongoDBModel.create(newAccount)
            return accountCreated
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async read({ userId }) {
        try {
            const accounts = await accountsMongoDBModel.find(
                { user: userId },
                { name: 1, balance: 1 }
            )
            return accounts
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
            const updatedAccount = await accountsMongoDBModel.findByIdAndUpdate(id, {
                name,
                $inc: { balance: amount }
            }, {
                new: true,
                projection: {
                    name: 1,
                    balance: 1
                }
            })

            return updatedAccount
        } catch (error) {
            throw new Error(error.message)
        }
    }
}