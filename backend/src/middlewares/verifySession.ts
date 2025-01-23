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
    const token = req.cookies.access_token
    if (!token) {
        res.status(403).json({ message: 'Access not authorized' })
        return
    }

    try {
        const userData = jwt.verify(token, config.SECRET_JWT_KEY!) as iUserData
        req.user = userData.user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Access not authorized' })
        return
    }
}