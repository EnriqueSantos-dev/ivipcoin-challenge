import { Request, Response } from 'express'
import { z } from 'zod'

import { AuthService } from '@/services'

import { mapZodErrorsToFieldMessages } from '@/utils/zod-mapper'

import { BadRequestError } from '@/helpers/http-error'

export class AuthController {
	constructor(private readonly authService: AuthService) {}

	async login(request: Request, response: Response) {
		const loginSchema = z.object({
			email: z.string().min(1),
			password: z.string().min(1),
		})

		const resultParsed = loginSchema.safeParse(request.body)

		if (!resultParsed.success)
			throw new BadRequestError(mapZodErrorsToFieldMessages(resultParsed.error))

		const { email, password } = resultParsed.data
		const token = await this.authService.login(email, password)

		return response.status(200).json({ access_token: token })
	}

	async verifyToken(request: Request, response: Response) {
		return response.status(204).end()
	}
}
