import { NotFoundError } from "../controllers/errors"
import { iTransactions, iTransactionMovements } from "../interfaces/transactions"
import { Model, Schema } from "mongoose"
import { walletsMongoDbModel } from "../schemas/mongodb/wallets"
import { ModelBase } from "./ModelBase.js"

export class Transaction extends ModelBase<iTransactions> {

    private mongoDbModel: Model<iTransactions>
    private movement: iTransactionMovements

    constructor(mongoDbModel: Model<iTransactions>, movement: iTransactionMovements) {
        super()
        this.mongoDbModel = mongoDbModel
        this.movement = movement
    }

    async create(userId: Schema.Types.ObjectId, input: iTransactions) {
        const {
            amount,
            categoryId,
            date,
            notes,
            walletId
        } = input

        const newTransaction = {
            amount,
            categoryId,
            date,
            notes,
            userId: userId,
            walletId
        }

        const session = await this.mongoDbModel.startSession()
        session.startTransaction()

        try {
            const createdTransaction = await this.mongoDbModel.create([newTransaction], { session })

            let walletUpdateAmount
            if (this.movement === 'income') {
                walletUpdateAmount = amount
            }
            if (this.movement === 'expense') {
                walletUpdateAmount = -amount
            }

            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId, _id: walletId, status: true },
                { $inc: { balance: walletUpdateAmount } },
                { new: true, session },
            )

            if (!updatedWallet) {
                throw new Error("Wallet don't exist or has been deleted")
            }

            await session.commitTransaction()

            return createdTransaction[0]
        } catch (error: any) {
            await session.abortTransaction()

            throw new Error(error.message)
        } finally {
            session.endSession()
        }
    }

    async read(userId: Schema.Types.ObjectId) {
        try {
            const transactions = await this.mongoDbModel.find({ userId: userId, status: true })
            return transactions
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async readById(userId: Schema.Types.ObjectId, id: Schema.Types.ObjectId) {
        try {
            const transaction = await this.mongoDbModel.findOne({ userId: userId, _id: id, status: true })
            return transaction
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async readByWalletId(userId: Schema.Types.ObjectId, walletId: Schema.Types.ObjectId) {
        try {
            const transactions = await this.mongoDbModel.find({ userId: userId, walletId: walletId, status: true })
            return transactions
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async update(userId: Schema.Types.ObjectId, id: Schema.Types.ObjectId, input: iTransactions) {
        const {
            amount,
            categoryId,
            date,
            notes,
            walletId
        } = input

        const session = await this.mongoDbModel.startSession()
        session.startTransaction()

        try {
            const updatedTransaction = await this.mongoDbModel.findOneAndUpdate({ userId: userId, id: id, status: true }, {
                amount,
                categoryId,
                date,
                notes,
                walletId
            }, { new: true, session })

            if (!updatedTransaction) {
                throw new NotFoundError("transaction doesn't exists or has been deleted")
            }

            let walletUpdateAmount
            if (this.movement === 'income') {
                walletUpdateAmount = amount
            }
            if (this.movement === 'expense') {
                walletUpdateAmount = -amount
            }

            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId: userId, id: id, status: true }, {
                $inc: { balance: walletUpdateAmount },
            }, { new: true, session })

            if (!updatedWallet) {
                throw new NotFoundError("Wallet doesn't exists or has been deleted")
            }

            await session.commitTransaction()

            return updatedTransaction
        } catch (error) {
            await session.abortTransaction()

            throw error
        } finally {
            await session.endSession()
        }
    }

    async delete(userId: Schema.Types.ObjectId, id: Schema.Types.ObjectId) {
        const session = await this.mongoDbModel.startSession()
        session.startTransaction()

        try {
            const deletedTransaction = await this.mongoDbModel.findOneAndUpdate({ userId: userId, _id: id, status: true }, {
                status: false
            }, { new: true, session })

            if (!deletedTransaction) {
                throw new NotFoundError("transaction doesn't exists or has already been deleted")
            }

            const deletedTransactionAmount: number = parseFloat(deletedTransaction.amount.toString())

            let walletUpdateAmount
            if (this.movement === 'income') {
                walletUpdateAmount = -deletedTransactionAmount
            }
            if (this.movement === 'expense') {
                walletUpdateAmount = deletedTransactionAmount
            }

            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ userId: userId, _id: deletedTransaction.walletId, status: true }, {
                $inc: { balance: walletUpdateAmount },
            }, { new: true, session })

            if (!updatedWallet) {
                throw new NotFoundError("Wallet doesn't exists or has been deleted")
            }

            await session.commitTransaction()

            return deletedTransaction
        } catch (error) {
            await session.abortTransaction()

            throw error
        } finally {
            await session.endSession()
        }
    }
}