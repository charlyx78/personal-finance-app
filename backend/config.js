import dotenv from 'dotenv'

dotenv.config()

export const {
    PORT = 3000,
    MONGO_URI,
    SALT_ROUNDS = 10,
    SECRET_JWT_KEY, 
    NODE_ENV 
} = process.env