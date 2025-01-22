import { NotFoundError } from "../controllers/errors.js"
import { iTransactionMovements } from "../interfaces/transactions.js"
import { expensesMongoDbModel } from "../schemas/mongodb/expenses.js"
import { Transaction } from "./Transaction"

export class Expense extends Transaction {
    constructor() {
        super(expensesMongoDbModel, iTransactionMovements.EXPENSE)
    }
}