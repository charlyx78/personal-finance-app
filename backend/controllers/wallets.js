import { Wallet } from "../models/Wallet.js"
import { AuthController } from "./auth.js"

const wallet = new Wallet()

export class WalletsController {
    create = async (req, res) => {
        try {
            const newWallet = await wallet.create({ userId: req.user.id, input: req.body })
            return res.status(201).json({ wallet: newWallet })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    read = async (req, res) => {
        try {
            const wallets = await wallet.read({ userId: req.user.id })

            if (wallets.length === 0) {
                return res.status(400).json({ error: 'No wallets found for user' })
            }

            return res.status(201).json({ wallets: wallets })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    readById = async (req, res) => {
        try {
            const walletFound = await wallet.readById({ userId: req.user.id, id: req.params.id })

            if (!walletFound) {
                return res.status(400).json({ error: 'Wallet not found' })
            }

            return res.status(201).json({ wallet: walletFound })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    update = async (req, res) => {
        try {
            const updatedWallet = await wallet.update({ userId: req.user.id, id: req.params.id, input: req.body })

            return res.status(200).json({ wallet: updatedWallet })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    delete = async (req, res) => {
        try {
            const deletedWallet = await wallet.delete({ userId: req.user.id, id: req.params.id })

            return res.status(200).json({ wallet: deletedWallet })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}