import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express, { json } from 'express'
import { PORT } from './config.js'
import { createAuthRouter } from './routes/auth.js'
import { createUsersRouter } from './routes/users.js'

dotenv.config()

const app = express()

app.use(json())
app.disable('x-powered-by')

app.use('/auth', createAuthRouter())
app.use('/users', createUsersRouter())

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB!')
}).catch((error) => {
    console.log('Error al conectarse con la base de datos: ', error)
})

