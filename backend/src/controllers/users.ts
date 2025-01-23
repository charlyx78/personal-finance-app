import { Request, Response } from 'express'
import { User } from '../models/User.js'
// import { validateUser } from '../schemas/zod/users.js'

const user = new User()

export class UserController {
    create = async (req: Request, res: Response): Promise<void> => {
        // const result = validateUser(req.body)

        // if (!result.success) {
        //     res.status(400).json({ error: JSON.parse(result.error.message) })
        // }

        try {
            // const newUser = await user.create(result.data!)
            const newUser = await user.create(req.body)
            res.status(201).json({ user: newUser })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}