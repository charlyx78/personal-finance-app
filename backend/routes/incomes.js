import { Router } from "express";
import { IncomesController } from "../controllers/incomes.js";


export function createIncomesRouter() {
    const incomesRouter = Router()
    
    const incomesController = new IncomesController()

    incomesRouter.post("/", incomesController.create)
    incomesRouter.get("/", incomesController.read)
    incomesRouter.get("/:id", incomesController.readById)
    incomesRouter.get("/wallet/:id", incomesController.readByWalletId)
    incomesRouter.patch("/:id", incomesController.update)
    incomesRouter.delete("/:id", incomesController.delete)

    return incomesRouter
}