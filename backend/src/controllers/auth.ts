import { config } from "../config";
import { Auth } from "../models/Auth";
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import { iUsersOutput, iUserSessionData } from "../interfaces/users";

const auth = new Auth()

export class AuthController {
    login = async (req: Request, res: Response): Promise<void> => {
        const {
            email,
            password
        } = req.body

        try {
            const userLogged = await auth.login(email, password)

            const refreshToken = jwt.sign({ user: userLogged }, config.SECRET_JWT_KEY, {
                expiresIn: config.REFRESH_TOKEN_EXPIRATION_TIME
            })
            const accessToken = jwt.sign({ user: userLogged }, config.SECRET_JWT_KEY, {
                expiresIn: config.ACCESS_TOKEN_EXPIRATION_TIME
            })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // cookie only can only be accessed on the server
                secure: config.NODE_ENV === 'PROD', // cookie only can only be accesed on https requests
                sameSite: 'strict'
            })
            res.cookie('accessToken', accessToken, {
                httpOnly: true, // cookie only can only be accessed on the server
                secure: config.NODE_ENV === 'PROD', // cookie only can only be accesed on https requests
                sameSite: 'strict'
            })

            await auth.saveToken(userLogged._id!, refreshToken)

            res.status(200).json({ mesage: "User authenticated successfully!" })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" : error.message })
        }
    }

    refreshToken = async (req: Request, res: Response): Promise<void> => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            res.status(401).json({ message: "Error while regenerating session. Please try login agin" })
            return
        }

        try {
            const userData = jwt.verify(refreshToken, config.SECRET_JWT_KEY) as iUserSessionData
            const dbRefreshToken = await auth.getToken(userData.user._id)

            if (refreshToken != dbRefreshToken) {
                res.status(401).json({ message: "Error while regenerating session. Please try login agin" })
                return
            }

            const newAccessToken = jwt.sign(
                { user: userData },
                config.SECRET_JWT_KEY,
                { expiresIn: config.ACCESS_TOKEN_EXPIRATION_TIME }
            )
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true, // cookie only can only be accessed on the server
                secure: config.NODE_ENV === 'PROD', // cookie only can only be accesed on https requests
                sameSite: 'strict'
            })

            res.status(200).json({ message: "Token refreshed successfully!" })
        } catch (error: any) {
            res.status(403).json({ error: config.NODE_ENV === "PROD" ? "Error while regenerating session. Please try login agin": error.message })
        }
    }

    logout = async (req: Request, res: Response): Promise<void> => {
        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')
        res.clearCookie('accessToken').json({ message: 'Logout successful' })
    }
}