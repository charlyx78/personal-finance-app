import { Router } from "express"

export function createAuthRouter() {
    const authRouter = Router()

    authRouter.post('/login', (req,res) => {})

    return authRouter
}