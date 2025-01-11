import { NotFoundError } from "../controllers/errors.js"
import { expensesMongoDbModel } from '../mongodb_schemas/expenses.js'
import { walletsMongoDbModel } from "../mongodb_schemas/wallets.js"

export class Expense {
    async create({ userId, input }) {
        const {
            amount,
            categoryId,
            date,
            notes,
            walletId
        } = input

        const newExpense = {
            amount,
            categoryId,
            date,
            notes,
            userId: userId,
            walletId
        }

        const session = await expensesMongoDbModel.startSession()
        session.startTransaction()

        try {
            const createdExpense = await expensesMongoDbModel.create([newExpense], { session })

            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId, _id: walletId, status: true },
                { $inc: { balance: amount * -1 } },
                { new: true, session },
            )

            if (!updatedWallet) {
                throw new NotFoundError("Wallet don't exist or has been deleted")
            }

            await session.commitTransaction()

            return createdExpense
        } catch (error) {
            await session.abortTransaction()

            throw new Error(error.message)
        } finally {
            session.endSession()
        }
    }

    async read({ userId }) {
        try {
            const expenses = await expensesMongoDbModel.find({ userId: userId, status: true })
            return expenses
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async readById({ userId, id }) {
        try {
            const expense = await expensesMongoDbModel.findOne({ userId: userId, _id: id, status: true })
            return expense
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async readByWalletId({ userId, walletId }) {
        try {
            const expenses = await expensesMongoDbModel.find({ userId: userId, walletId: walletId, status: true })
            return expenses
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update({ userId, id, input }) {
        const {
            amount,
            categoryId,
            date,
            notes,
            walletId
        } = input

        const session = await expensesMongoDbModel.startSession()
        session.startTransaction()

        try {
            const updatedExpense = await expensesMongoDbModel.findOneAndUpdate({ userId: userId, id: id, status: true }, {
                amount,
                categoryId,
                date,
                notes,
                walletId
            }, { new: true, session })

            if (!updatedExpense) {
                throw new NotFoundError("Expense doesn't exists or has been deleted")
            }

            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId: userId, id: id, status: true }, {
                $inc: { balance: amount * -1 },
            }, { new: true, session })

            if (!updatedWallet) {
                throw new NotFoundError("Wallet doesn't exists or has been deleted")
            }

            await session.commitTransaction()

            return updatedExpense
        } catch (error) {
            await session.abortTransaction()

            throw error
        } finally {
            await session.endSession()
        }
    }

    async delete({ userId, id }) {
        const session = await expensesMongoDbModel.startSession()
        session.startTransaction()

        try {
            const deletedExpense = await expensesMongoDbModel.findOneAndUpdate({ userId: userId, _id: id, status: true }, {
                status: false
            }, { new: true, session })

            if (!deletedExpense) {
                throw new NotFoundError("Expense doesn't exists or has already been deleted")
            }

            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId: userId, _id: deletedExpense.walletId, status: true }, {
                $inc: { balance: deletedExpense.amount },
            }, { new: true, session })

            if (!updatedWallet) {
                throw new NotFoundError("Wallet doesn't exists or has been deleted")
            }

            await session.commitTransaction()

            return deletedExpense
        } catch (error) {
            await session.abortTransaction()

            throw error
        } finally {
            await session.endSession()
        }
    }
}