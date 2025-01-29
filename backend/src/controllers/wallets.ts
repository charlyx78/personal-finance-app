import { Wallet } from "../models/Wallet.js"
import { iWalletsInput } from "../interfaces/wallets.js"
import { Response, Request } from "express"

const wallet = new Wallet()

export class WalletsController {
    create = async (req: Request, res: Response): Promise<void> => {
        const {
            name,
            balance,
            type,
        } = req.body

        const walletData: iWalletsInput = {
            name,
            balance,
            type,
            userId: req.user!._id
        }

        try {
            const newWallet = await wallet.create(walletData)
            res.status(201).json({ message: "Wallet created successfully!", wallet: newWallet })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    read = async (req: Request, res: Response): Promise<void> => {
        try {
            const wallets = await wallet.read(req.user!._id)

            if (wallets.length === 0) {
                res.status(400).json({ message: 'Wallets found successfully!', error: 'Wallets not found' })
                return
            }

            res.status(201).json({ message: "Wallets founds succesfully!", wallets: wallets })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    readById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const walletFound = await wallet.readById(req.params.id)

            if (!walletFound) {
                res.status(404).json({ error: 'Wallet not found' })
                return
            }

            res.status(201).json({ message: "Wallet found succesfully!", wallet: walletFound })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const { name } = req.body

        const walletData: Partial<iWalletsInput> = { name }

        try {
            const updatedWallet = await wallet.update(req.params.id, walletData)

            if (!updatedWallet) {
                res.status(404).json({ error: "Wallet doesn't exists or has been deleted" })
                return
            }

            res.status(200).json({ message: 'Wallet updated successfully!', wallet: updatedWallet })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const deletedWallet = await wallet.delete(req.params.id)

            if (!deletedWallet) {
                res.status(404).json({ error: "Wallet doesn't exists or has already been deleted" })
                return
            }

            res.status(200).json({ message: 'Wallet deleted successfully!', wallet: deletedWallet })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
}