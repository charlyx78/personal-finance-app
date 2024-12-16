import { Router } from "express"
import { AccountsController } from "../controllers/accounts.js"

export function createAccountRouter() {
    const accountRouter = Router()

    const accountsController = new AccountsController()

    accountRouter.post('', accountsController.create)
    accountRouter.get('', accountsController.read)
    accountRouter.patch('', accountsController.update)

    return accountRouter
}