import { userMongoDbModel } from '../mongodb_schemas/users.js'

export class User {
    async create({ input }) {
        const {
            name,
            lastName,
            email,
            password
        } = input

        const newUser = {
            name,
            lastName,
            email,
            password 
        }

        try {
            const createdUser = await userMongoDbModel.create(newUser)
            return createdUser
        } catch(error) {
            throw new Error(error)
        }
    }
}