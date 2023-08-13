import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { env } from '@/config/env'

import { ForbiddenError, UnauthorizedError } from '@/helpers/http-error'

export async function requireAuthenticated(
	req: Request,
	_res: Response,
	next: NextFunction,
) {
	try {
		const headers = req.headers
		const hasAuthorizationHeader =
			'Authorization' in headers || 'authorization' in headers

		if (!hasAuthorizationHeader)
			throw new UnauthorizedError('Authorization header not found')

		const token = req.headers.authorization?.split(' ')[1]

		if (!token) throw new UnauthorizedError('Token Not Provided')

		const isValidToken = jwt.verify(token, env.jwt.secret) as {
			sub: string
			email: string
		}

		req.user = { id: isValidToken.sub, email: isValidToken.email }
		next()
	} catch (error) {
		throw new ForbiddenError('Invalid Token')
	}
}
