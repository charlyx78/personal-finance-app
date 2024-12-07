import { userMongoDbModel } from "../mongodb_schemas/users.js";
import bcrypt from 'bcrypt'
import { AuthenticationError, NotFoundError } from "../controllers/errors.js";

export class Auth {
    async login({ input }) {
        const {
            email,
            password
        } = input

        const user = await userMongoDbModel.findOne({ email })

        if (!user) throw new NotFoundError('User not found')

        console.log('input: ' + password)
        console.log('database: ' + user.password)

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) throw new AuthenticationError('Email or password are not valid. Please try again')

        const userLogged = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email
        }

        return userLogged
    }
}