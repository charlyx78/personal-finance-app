import { Router } from "express"
import { AccountsController } from "../controllers/accounts.js"

export function createAccountRouter() {
    const accountRouter = Router()

    const accountsController = new AccountsController()

    accountRouter.post('/create', accountsController.create)

    return accountRouter
}