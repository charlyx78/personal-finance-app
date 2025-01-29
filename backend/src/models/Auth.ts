import { userMongoDbModel } from "../schemas/mongodb/users";
import { iUsers, iUsersOutput } from "../interfaces/users";
import bcrypt from 'bcrypt'
import { AuthenticationError, NotFoundError } from "../controllers/errors";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Schema } from "mongoose";
export class Auth {
    async login(email: string, password: string): Promise<Partial<iUsersOutput>> {
        const user: Partial<iUsersOutput | null> = await userMongoDbModel.findOne({ email })

        if (!user) throw new NotFoundError('User not found')

        const isValid = await bcrypt.compare(password, user!.password!)

        if (!isValid) throw new AuthenticationError('Email or password are not valid. Please try again')

        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
        }
    }

    async getToken(userId: string): Promise<string | null> {
        try {
            const user = await userMongoDbModel.findById(userId, {
                _id: false,
                sessionToken: true
            })

            if(!user) {
                throw new Error("User not found")
            }

            return user!.sessionToken!
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async saveToken(userId: Schema.Types.ObjectId, token: string = ""): Promise<void> {
        await userMongoDbModel.findByIdAndUpdate(userId, {
            sessionToken: token
        })
    }
}