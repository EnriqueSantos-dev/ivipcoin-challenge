import 'express-async-errors'

import { authRoutes, todosRoutes, usersRouter } from '@/routes'

import { errorHandler } from '@/middlewares'

import { initDatabase } from '@/config/database'
import { env } from '@/config/env'

import { app } from './app'

app.use('/api/v1/todos', todosRoutes)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRoutes)
app.use(errorHandler)

app.listen(env.port, () => {
	initDatabase().then(() => {
		console.log(`Server is running on port ${env.port}`)
	})
})
