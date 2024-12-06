import { userMongoDbModel } from '../mongodb_schemas/users.js'
import bcrypt  from 'bcrypt'
import { SALT_ROUNDS } from '../config.js'

export class User {
    async create({ input }) {
        const {
            name,
            lastName,
            email,
            password
        } = input

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const newUser = {
            name,
            lastName,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await userMongoDbModel.create(newUser)
            return createdUser
        } catch(error) {
            throw new Error(error.message)
        }
    }
}