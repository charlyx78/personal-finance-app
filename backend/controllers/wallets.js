import { SECRET_JWT_KEY } from "../config.js"
import { Wallet } from "../models/Wallet.js"
import jwt from 'jsonwebtoken'

const wallet = new Wallet()

export class WalletsController {
    create = async (req, res) => {
        try {
            const accessToken = req.cookies.access_token
            const tokenObject = jwt.decode(accessToken, SECRET_JWT_KEY)
            const { user } = tokenObject

            const newWallet = await wallet.create({ input: req.body, userId: user.id })
            return res.status(201).json({ wallet: newWallet })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    read = async (req, res) => {
        try {
            const accessToken = req.cookies.access_token
            const tokenObject = jwt.decode(accessToken, SECRET_JWT_KEY)
            const { user } = tokenObject

            const wallets = await wallet.read({ userId: user.id })

            if (wallets.length === 0) {
                return res.status(400).json({ error: 'No wallets found for user' })
            }

            return res.status(201).json({ wallets: wallets })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    update = async(req, res) => {
        try {
            const updatedWallet = await wallet.update({ input: req.body })

            return res.status(200).json({ wallet: updatedWallet })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}