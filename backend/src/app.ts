import express, { Application, json } from 'express'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";

import { config } from './config'
import { createAuthRouter } from './routes/auth'
import { createUsersRouter } from './routes/users'
import { createWalletsRouter } from './routes/wallets';
import { createCategoriesRouter } from './routes/categories';
import { createIncomesRouter } from './routes/incomes';
import { createExpensesRouter } from './routes/expenses';
import { verifySession } from './middlewares/verifySession';

const app: Application = express()

app.use(cookieParser())
app.use(json())
app.disable('x-powered-by')

app.use('/auth', createAuthRouter())
app.use('/users', createUsersRouter())
app.use('/wallets', verifySession, createWalletsRouter())
app.use('/categories', verifySession, createCategoriesRouter())
app.use('/incomes', verifySession, createIncomesRouter())
app.use('/expenses', verifySession, createExpensesRouter())

app.listen(config.PORT, () => {
    console.log(`Server running on port: ${config.PORT}`)
})

mongoose.connect(config.MONGO_URI!).then(() => {
    console.log('Connected to MongoDB!')
}).catch((error) => {
    console.log('Error al conectarse con la base de datos: ', error)
})

