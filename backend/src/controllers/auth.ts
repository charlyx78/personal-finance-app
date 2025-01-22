import { NODE_ENV, SECRET_JWT_KEY } from "../config";
import { Auth } from "../models/Auth";
import jwt from 'jsonwebtoken'
import { iUsers } from "../schemas/mongodb/users";
import { Request, Response } from "express";

const auth = new Auth()

export class AuthController {
    login = async (req: Request, res: Response) => {
        const {
            email,
            password
        } = req.body
        
        try {
            const userLogged = await auth.login(email, password)

            const token = jwt.sign({ user: userLogged }, SECRET_JWT_KEY, {
                expiresIn: '1h'
            })

            res.cookie('access_token', token, {
                httpOnly: true, // cookie only can only be accessed on the server
                secure: NODE_ENV === 'production', // cookie only can only be accesed on https requests
                sameSite: 'strict'
            })

            return res.status(200).json({ user: userLogged })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }

    logout = async (req: Request, res: Response) => {
        return res.clearCookie('access_token').json({ message: 'Logout successful' })
    }
}