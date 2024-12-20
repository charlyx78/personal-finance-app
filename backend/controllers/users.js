import { User } from '../models/User.js'
import { validateUser } from '../zod_schemas/users.js'

const user = new User()

export class UserController {
    create = async (req, res) => {
        const result = validateUser(req.body)
        
        if (!result.success) {
            res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        try{
            const newUser = await user.create({ input: result.data })
            res.status(201).json(newUser)
        } catch(error) {
            res.status(500).json(error)
        }
    }
}