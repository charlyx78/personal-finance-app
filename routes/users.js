import { Router } from "express"
import { UserController } from '../controllers/users.js'

export function createUsersRouter() {
    const usersRouter = Router()

    const userController = new UserController()

    usersRouter.post('/', userController.create)

    return usersRouter
}