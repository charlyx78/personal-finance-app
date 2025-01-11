import { Router } from "express";
import { IncomesController } from "../controllers/incomes.js";


export function createIncomesRouter() {
    const incomesRouter = Router()
    
    const incomesController = new IncomesController()

    incomesRouter.post("/", incomesController.create)

    return incomesRouter
}