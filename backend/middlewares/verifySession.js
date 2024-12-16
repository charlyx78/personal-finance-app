import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'

export const verifySession = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token)
        return res.status(403).json({ message: 'Access not authorized' })

    if(token.expire)
        return res.status(403).json({ message: 'Access not authorized' })

    try {
        const userData = jwt.verify(token, SECRET_JWT_KEY)
        if(!req.user) {
            req.user = userData.id
        }
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Access not authorized' })
    }
}