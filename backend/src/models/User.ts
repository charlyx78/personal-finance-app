import { iUsers, userMongoDbModel } from '../schemas/mongodb/users'
import { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config'
import { ModelBase } from './ModelBase'

export class User {

    async create(input: iUsers): Promise<Partial<iUsers>> {
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
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}