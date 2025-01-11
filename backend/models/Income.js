import { incomesMongoDbModel } from "../mongodb_schemas/incomes.js"
import { walletsMongoDbModel } from "../mongodb_schemas/wallets.js"

export class Income {
    async create({ input }) {
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
            walletId
        }

        const session = await incomesMongoDbModel.startSession()
        session.startTransaction()

        try {
            const createdIncome = await incomesMongoDbModel.create([newIncome], { session })

            await walletsMongoDbModel.findByIdAndUpdate(walletId,
                { $inc: { balance: amount } },
                { session }
            )

            await session.commitTransaction()
            session.endSession()

            return createdIncome
        } catch (error) {
            await session.abortTransaction()
            session.endSession()
            
            throw new Error(error.message)
        }
    }

    async read({ walletId }) {
        try {
            const incomes = await incomesMongoDbModel.find({ walletId: walletId })
            return incomes
        } catch (error) {
            throw new Error(error.message)

        }
    }
}