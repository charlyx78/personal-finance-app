import jwt from 'jsonwebtoken'
import { config } from '../config'
import { NextFunction, Request, Response } from 'express'

declare global {
    namespace Express {
        export interface Request {
            user?: {
                id: string,
                name: string,
                lastName: string,
                email: string
            }
        }
    }
}

interface iUserData {
    user: {
        id: string,
        name: string,
        lastName: string,
        email: string
    }
}

export const verifySession = (req: Request, res: Response, next: NextFunction): void => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
        res.status(403).json({ message: 'Access not authorized' })
        return
    }

    try {
        const userData = jwt.verify(accessToken, config.SECRET_JWT_KEY) as iUserData
        req.user = userData.user
        next()
    } catch (error: any) {
        res.status(401).json({ error: config.NODE_ENV === "PROD" ? 'Access not authorized' : error.message })
        return
    }
}