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
}