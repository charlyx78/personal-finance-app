import { SECRET_JWT_KEY } from "../config.js"
import { Account } from "../models/Account.js"
import jwt from 'jsonwebtoken'

const account = new Account()

export class AccountsController {
    create = async (req, res) => {
        try {
            const accessToken = req.cookies.access_token
            const tokenObject = jwt.decode(accessToken, SECRET_JWT_KEY)
            const { user } = tokenObject

            const newAccount = await account.create({ input: req.body, userId: user.id })
            return res.status(201).json({ account: newAccount })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    read = async (req, res) => {
        try {
            const accessToken = req.cookies.access_token
            const tokenObject = jwt.decode(accessToken, SECRET_JWT_KEY)
            const { user } = tokenObject

            const accounts = await account.read({ userId: user.id })

            if (accounts.length === 0) {
                return res.status(400).json({ error: 'No accounts found for user' })
            }

            return res.status(201).json({ accounts: accounts })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    update = async(req, res) => {
        try {
            const updatedAccount = await account.update({ input: req.body })

            return res.status(200).json({ account: updatedAccount })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}