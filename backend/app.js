import express, { json } from 'express'
import { PORT } from './config.js'
import { createAuthRouter } from './routes/auth.js'
import { createUsersRouter } from './routes/users.js'

const app = express()

app.use(json())
app.disable('x-powered-by')

app.use('/auth', createAuthRouter())
app.use('/users', createUsersRouter())

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

