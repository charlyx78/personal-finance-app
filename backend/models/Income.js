import { incomesMongoDbModel } from "../mongodb_schemas/incomes.js"

export class Income {
    async create({input}) {
        const {
            amount,
            category,
            date,
            notes,
            wallet
        } = input

        const newIncome = {
            amount,
            category,
            date,
            notes,
            wallet
        }

        try {
            const createdIncome = await incomesMongoDbModel.create(newIncome)
            return createdIncome
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async read({ walletId }){ 
        try {
            const incomes = await incomesMongoDbModel.find({ walletId: walletId })
            return incomes
        } catch (error) {
            throw new Error(error.message)
                        
        }
    }    
}