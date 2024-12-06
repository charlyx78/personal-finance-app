import { userMongoDbModel } from "../mongodb_schemas/users.js";
import bcrypt  from 'bcrypt'
import { AuthenticationError, NotFoundError } from "../controllers/errors.js";

export class Auth {
    async login({ input }) {
        const {
            email,
            password
        } = input

        const user = await userMongoDbModel.findOne({ email })

        if(!user) throw new NotFoundError('User not found')

        const isValid = bcrypt.compare(password, user.password)

        if(!isValid) throw new AuthenticationError('Email or password are not valid. Please try again')

        const userLogged = {
            email: user.email
        }
        
        return userLogged
    }
}