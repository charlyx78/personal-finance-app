import { incomesMongoDbModel } from "../mongodb_schemas/incomes.js"
import { walletsMongoDbModel } from "../mongodb_schemas/wallets.js"

export class Income {
    async create({ userId, input }) {
        const {
            amount,
            categoryId,
            date,
            notes,
            walletId
        } = input

        const newIncome = {
            amount,
            categoryId,
            date,
            notes,
            userId: userId,
            walletId
        }

        const session = await incomesMongoDbModel.startSession()
        session.startTransaction()

        try {
            const createdIncome = await incomesMongoDbModel.create([newIncome], { session })

            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId, wallet: walletId, status: true },
                { $inc: { balance: amount } },
                { new: true, session },
            )

            if(!updatedWallet) {
                throw new Error("Wallet don't exist or has been deleted")
            }

            await session.commitTransaction()

            return createdIncome
        } catch (error) {
            await session.abortTransaction()

            throw new Error(error.message)
        } finally {
            session.endSession()
        }
    }

    async read({ userId }) {
        try {
            const incomes = await incomesMongoDbModel.find({ userId: userId, status: true })
            return incomes
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async readById({ userId, id }) {
        try {
            const income = await incomesMongoDbModel.findOne({ userId: userId, id: id, status: true })
            return income
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async readByWalletId({ userId, walletId }) {
        try {
            const incomes = await incomesMongoDbModel.find({ userId: userId, walletId: walletId, status: true })
            return incomes
        } catch (error) {
            throw new Error(error.message)
        }
    }
}