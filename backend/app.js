import express, { json } from 'express'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";

import { PORT, MONGO_URI } from './config.js'
import { createAuthRouter } from './routes/auth.js'
import { createUsersRouter } from './routes/users.js'
import { verifySession } from './middlewares/verifySession.js';
import { createAccountRouter } from './routes/accounts.js';

const app = express()

app.use(cookieParser())
app.use(json())
app.disable('x-powered-by')

app.use('/auth', createAuthRouter())
app.use('/users', createUsersRouter())
app.use('/accounts', verifySession, createAccountRouter())

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

await mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB!')
}).catch((error) => {
    console.log('Error al conectarse con la base de datos: ', error)
})

