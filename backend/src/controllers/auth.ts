import { config } from "../config";
import { Auth } from "../models/Auth";
import jwt from 'jsonwebtoken'
import { iUsers } from "../schemas/mongodb/users";
import { Request, Response } from "express";

const auth = new Auth()

export class AuthController {
    login = async (req: Request, res: Response): Promise<void> => {
        const {
            email,
            password
        } = req.body

        try {
            const userLogged = await auth.login(email, password)

            const token = jwt.sign({ user: userLogged }, config.SECRET_JWT_KEY!, {
                expiresIn: '1h'
            })

            res.cookie('access_token', token, {
                httpOnly: true, // cookie only can only be accessed on the server
                secure: config.NODE_ENV === 'production', // cookie only can only be accesed on https requests
                sameSite: 'strict'
            })

            res.status(200).json({ mesage: "User authenticated successfully!", user: userLogged })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    logout = async (req: Request, res: Response): Promise<void> => {
        res.clearCookie('access_token').json({ message: 'Logout successful' })
    }
}