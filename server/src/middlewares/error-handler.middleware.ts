import { NextFunction, Request, Response } from 'express'

import { BadRequestError, HttpError } from '@/helpers/http-error'

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!err) return next()

	if (err instanceof BadRequestError) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err.error,
			message: err.message,
			errors: err.errors,
		})
	}

	if (err instanceof HttpError) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err.error,
			message: err.message,
		})
	}

	return res.status(500).json({
		status: 'error',
		error: 'INTERNAL_SERVER_ERROR',
		message: 'Internal Server Error',
	})
}
