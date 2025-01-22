import { Router } from "express";
import { ExpensesController } from "../controllers/expenses.js";


export function createExpensesRouter() {
    const expensesRouter = Router()
    
    const expensesController = new ExpensesController()

    expensesRouter.post("/", expensesController.create)
    expensesRouter.get("/", expensesController.read)
    expensesRouter.get("/:id", expensesController.readById)
    expensesRouter.get("/wallet/:id", expensesController.readByWalletId)
    expensesRouter.patch("/:id", expensesController.update)
    expensesRouter.delete("/:id", expensesController.delete)

    return expensesRouter
}