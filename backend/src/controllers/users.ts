import { Request, Response } from 'express'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import { config } from '../config'

const user = new User()

export class UserController {
    create = async (req: Request, res: Response): Promise<void> => {
        const {
            name,
            lastName,
            email,
            password
        } = req.body

        const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS)

        const userData = {
            name,
            lastName,
            email,
            password: hashedPassword
        }

        try {
            const newUser = await user.create(userData)
            res.status(201).json({ message: "User created successfully!", user: newUser })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }
}