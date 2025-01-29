import { iUsers, userMongoDbModel } from '../schemas/mongodb/users'

export class User {
    async create(input: iUsers): Promise<Partial<iUsers>> {
        try {
            const createdUser = await userMongoDbModel.create(input)
            return createdUser
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}