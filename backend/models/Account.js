import { accountMongoDBModel } from "../mongodb_schemas/accounts.js"

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
            const accountCreated = await accountMongoDBModel.create(newAccount)
            return accountCreated
        } catch (error) {
            throw new Error(error.message)
        }
    }
}