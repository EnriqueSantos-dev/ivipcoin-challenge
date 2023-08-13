import { Router } from 'express'

import { UsersController } from '@/controllers'

import { AceBaseUsersRepository } from '@/repositories/users'

import { HashService, UsersService } from '@/services'

import { env } from '@/config/env'

const usersRouter = Router()

const usersRepository = new AceBaseUsersRepository()
const hashService = new HashService(Number(env.hashSalt))
const usersService = new UsersService(usersRepository, hashService)
const usersController = new UsersController(usersService)

usersRouter.post('/', (req, res) => usersController.createUser(req, res))

export { usersRouter }
