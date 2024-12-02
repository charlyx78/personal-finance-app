import { Router } from "express"

export function createAuthRouter() {
    const authRouter = Router()

    usersRouter.post('/login', (req,res) => {})

    return authRouter
}