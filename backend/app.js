import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express, { json } from 'express'
import { createUsersRouter } from './routes/users.js'

dotenv.config()

const app = express()

app.use(json())
app.disable('x-powered-by')

app.use('/users', createUsersRouter())

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB!')
}).catch((error) => {
    console.log('Error al conectarse con la base de datos: ', error)
})

