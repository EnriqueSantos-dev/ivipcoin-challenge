import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { z } from 'zod'

import { UsersService } from '@/services/users.service'

import { mapZodErrorsToFieldMessages } from '@/utils/zod-mapper'

import { BadRequestError } from '@/helpers/http-error'

export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	async createUser(request: Request, response: Response) {
		const createdUserSchema = z.object({
			name: z.string().min(5).max(50),
			email: z.string().email(),
			password: z.string().min(6).max(50),
		})

		const resultParsed = createdUserSchema.safeParse(request.body)

		if (!resultParsed.success)
			throw new BadRequestError(mapZodErrorsToFieldMessages(resultParsed.error))

		const hashedPassword = await bcrypt.hash(resultParsed.data.password, 10)
		const user = await this.usersService.createUser({
			...resultParsed.data,
			password: hashedPassword,
		})

		return response.status(201).json(user)
	}
}
