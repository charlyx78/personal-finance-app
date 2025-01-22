import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config'
import { Request, Response } from 'express'
import { Schema } from 'mongoose'

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

export const verifySession = (req: Request, res: Response, next: Function) => {
    const token = req.cookies.access_token
    if (!token)
        return res.status(403).json({ message: 'Access not authorized' })

    try {
        const userData = jwt.verify(token, SECRET_JWT_KEY) as iUserData
        if (!req.user) {
            req.user = userData.user
        }
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Access not authorized' })
    }
}