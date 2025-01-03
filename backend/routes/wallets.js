import { Router } from "express"
import { WalletsController } from "../controllers/wallets.js"

export function createWalletsRouter() {
    const walletRouter = Router()

    const walletsController = new WalletsController()

    walletRouter.post('/', walletsController.create)
    walletRouter.get('/', walletsController.read)
    walletRouter.patch('/:id', walletsController.update)
    walletRouter.delete('/:id', walletsController.delete)

    return walletRouter
}