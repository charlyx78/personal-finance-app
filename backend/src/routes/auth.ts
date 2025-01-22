import { Router } from "express"
import { AuthController } from "../controllers/auth"

export function createAuthRouter() {
    const authRouter = Router()

    const authController = new AuthController()

    authRouter.post('/login', authController.login)
    authRouter.post('/logout', authController.logout)

    return authRouter
}