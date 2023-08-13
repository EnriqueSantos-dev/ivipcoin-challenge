import { Router } from 'express'

import { AuthController } from '@/controllers'

import { AceBaseUsersRepository } from '@/repositories/users/acebase-users.repository'

import { AuthService, HashService, JwtService, UsersService } from '@/services'

import { env } from '@/config/env'

const authRoutes = Router()

const usersRepository = new AceBaseUsersRepository()

const hashService = new HashService(Number(env.hashSalt))
const jwtService = new JwtService(env.jwt.secret, env.jwt.expiresIn)
const usersService = new UsersService(usersRepository, hashService)
const authService = new AuthService(usersService, jwtService)

const authController = new AuthController(authService)

authRoutes.post('/login', (req, res) => authController.login(req, res))

export { authRoutes }
