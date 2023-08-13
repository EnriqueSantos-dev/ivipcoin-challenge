import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { env } from '@/config/env'

export async function requireAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const headers = req.headers
		const hasAuthorizationHeader =
			'Authorization' in headers || 'authorization' in headers

		if (!hasAuthorizationHeader) {
			return res.status(401).json({
				status: 'error',
				message: 'Authorization header not found',
				error: 'Unauthorized',
			})
		}

		const token = req.headers.authorization?.split(' ')[1]

		if (!token)
			return res.status(401).json({
				status: 'error',
				message: 'No Token Provider',
				error: 'Unauthorized',
			})

		const isValidToken = jwt.verify(token, env.jwt.secret) as {
			sub: string
			email: string
		}

		req.user = { id: isValidToken.sub, email: isValidToken.email }
		next()
	} catch (error) {
		return res
			.status(403)
			.json({ status: 'error', message: 'Invalid Token', error: 'Forbidden' })
	}
}
