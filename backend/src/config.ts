import dotenv from 'dotenv'

dotenv.config()

interface EnvVariables {
    PORT: number,
    MONGO_URI: string,
    SALT_ROUNDS: number,
    SECRET_JWT_KEY: string,
    NODE_ENV: string,
    REFRESH_TOKEN_EXPIRATION_TIME: string,
    ACCESS_TOKEN_EXPIRATION_TIME: string
}

const {
    PORT,
    MONGO_URI,
    SALT_ROUNDS,
    SECRET_JWT_KEY,
    NODE_ENV,
    REFRESH_TOKEN_EXPIRATION_TIME,
    ACCESS_TOKEN_EXPIRATION_TIME
} = process.env

if (!PORT ||
    !MONGO_URI ||
    !SALT_ROUNDS ||
    !SECRET_JWT_KEY ||
    !NODE_ENV ||
    !REFRESH_TOKEN_EXPIRATION_TIME ||
    !ACCESS_TOKEN_EXPIRATION_TIME
) {
    throw new Error(NODE_ENV === 'PROD' ? "Server error" : "Environment variable missing");
}

const portNumber = parseInt(PORT) 
const saltRoundsNumber = parseInt(SALT_ROUNDS) 

if (isNaN(portNumber) || isNaN(saltRoundsNumber)) {
    throw new Error(NODE_ENV === 'PROD' ? 'Server error' : "Environment variable missing")
}

export const config: EnvVariables = {
    PORT: portNumber,
    MONGO_URI,
    SALT_ROUNDS: saltRoundsNumber,
    SECRET_JWT_KEY,
    NODE_ENV,
    REFRESH_TOKEN_EXPIRATION_TIME,
    ACCESS_TOKEN_EXPIRATION_TIME
}