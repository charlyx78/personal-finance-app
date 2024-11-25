import express, { json } from 'express'
import { createUsersRouter } from './routes/users.js'

const app = express()

app.use(json())
app.disable('x-powered-by')

app.use('/users', createUsersRouter())

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

