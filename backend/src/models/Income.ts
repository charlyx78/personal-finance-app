import { NotFoundError } from "../controllers/errors.js"
import { iTransactionMovements } from "../interfaces/transactions.js"
import { incomesMongoDbModel } from "../schemas/mongodb/incomes"
import { Transaction } from "./Transaction"

export class Income extends Transaction {
    constructor() {
        super(incomesMongoDbModel, iTransactionMovements.INCOME)
    }
}