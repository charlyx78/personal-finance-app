import dotenv from 'dotenv'

dotenv.config()

interface EnvVariables {
    PORT: number,
    MONGO_URI?: string,
    SALT_ROUNDS: number,
    SECRET_JWT_KEY?: string, 
    NODE_ENV?: string 
}

const {
    PORT = 3000,
    MONGO_URI,
    SALT_ROUNDS = 10,
    SECRET_JWT_KEY, 
    NODE_ENV 
} = process.env

export const config: EnvVariables = {
    PORT: Number(PORT),
    MONGO_URI,
    SALT_ROUNDS: Number(SALT_ROUNDS),
    SECRET_JWT_KEY,
    NODE_ENV
}