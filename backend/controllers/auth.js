import { NODE_ENV, SECRET_JWT_KEY } from "../config.js";
import { Auth } from "../models/Auth.js";
import jwt from 'jsonwebtoken'

const auth = new Auth()

export class AuthController {
    login = async (req, res) => {
        try {
            const userLogged = await auth.login({ input: req.body })

            const token = jwt.sign({ user: userLogged }, SECRET_JWT_KEY, {
                expiresIn: '1h'
            })

            res.cookie('access_token', token, {
                httpOnly: true, // cookie only can only be accessed on the server
                secure: NODE_ENV === 'production', // cookie only can only be accesed on https requests
                sameSite: 'strict'
            })

            return res.status(200).json({ user: userLogged })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    static getLoggedUser = async (req, res) => {
        const accessToken = req.cookies.access_token
        const tokenObject = jwt.decode(accessToken, SECRET_JWT_KEY)
        const { user } = tokenObject
        return user
    }

    logout = async (req, res) => {
        return res.clearCookie('access_token').json({ message: 'Logout successful' })
    }
}