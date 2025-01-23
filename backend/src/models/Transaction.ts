import { NotFoundError } from "../controllers/errors"
import { iTransactions, iTransactionMovements, iTransactionsInput, iTransactionsOutput } from "../interfaces/transactions"
import { Model, Schema } from "mongoose"
import { walletsMongoDbModel } from "../schemas/mongodb/wallets"
import { ModelBase } from "./ModelBase.js"

export class Transaction extends ModelBase<iTransactionsInput, iTransactionsOutput> {

    private mongoDbModel: Model<iTransactions>
    private movement: iTransactionMovements

    constructor(mongoDbModel: Model<iTransactions>, movement: iTransactionMovements) {
        super()
        this.mongoDbModel = mongoDbModel
        this.movement = movement
    }

    async create(input: iTransactionsInput): Promise<iTransactionsOutput> {
        const {
            amount,
            categoryId,
            date,
            notes,
            userId,
            walletId
        }: iTransactionsInput = input

        const newTransaction = {
            amount,
            categoryId,
            date,
            notes,
            userId,
            walletId
        }

        const session = await this.mongoDbModel.startSession()
        session.startTransaction()

        try {
            const createdTransaction = await this.mongoDbModel.create([newTransaction], { session })

            const transactionOutput: iTransactionsOutput = {
                _id: createdTransaction[0]._id,
                amount: createdTransaction[0].amount,
                categoryId: createdTransaction[0].categoryId,
                date: createdTransaction[0].date,
                notes: createdTransaction[0].notes,
                walletId: createdTransaction[0].walletId,
                updatedAt: createdTransaction[0].updatedAt
            }

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

            return transactionOutput
        } catch (error: any) {
            await session.abortTransaction()

            throw new Error(error.message)
        } finally {
            session.endSession()
        }
    }

    async read(userId: string): Promise<Partial<iTransactionsOutput[]>> {
        try {
            const transactions: Partial<iTransactionsOutput[]> = await this.mongoDbModel.find({ userId: userId, status: true })
            return transactions
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async readById(id: string): Promise<Partial<iTransactionsOutput | null>> {
        try {
            const transaction: Partial<iTransactionsOutput | null> = await this.mongoDbModel.findOne({ _id: id, status: true })
            return transaction
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async readByWalletId(id: string): Promise<Partial<iTransactionsOutput[]>> {
        try {
            const transactions: Partial<iTransactionsOutput[]> = await this.mongoDbModel.find({ walletId: id, status: true })
            return transactions
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async update(id: string, input: iTransactionsInput): Promise<Partial<iTransactionsOutput | null>> {
        const {
            amount,
            categoryId,
            date,
            notes,
            walletId
        }: iTransactionsInput = input

        const session = await this.mongoDbModel.startSession()
        session.startTransaction()

        try {
            const updatedTransaction: Partial<iTransactionsOutput | null> = await this.mongoDbModel.findOneAndUpdate({ id: id, status: true }, {
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

            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ id: id, status: true }, {
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

    async delete(id: string): Promise<Partial<iTransactionsOutput | null>> {
        const session = await this.mongoDbModel.startSession()
        session.startTransaction()

        try {
            const deletedTransaction: Partial<iTransactionsOutput | null> = await this.mongoDbModel.findOneAndUpdate({ _id: id, status: true }, {
                status: false
            }, { new: true, session })

            if (!deletedTransaction) {
                throw new NotFoundError("transaction doesn't exists or has already been deleted")
            }

            const deletedTransactionAmount: number = parseFloat(deletedTransaction.amount!.toString())

            let walletUpdateAmount
            if (this.movement === 'income') {
                walletUpdateAmount = -deletedTransactionAmount
            }
            if (this.movement === 'expense') {
                walletUpdateAmount = deletedTransactionAmount
            }

            const updatedWallet = await walletsMongoDbModel.findOneAndUpdate({ _id: deletedTransaction.walletId, status: true }, {
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