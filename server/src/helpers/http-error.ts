export class HttpError extends Error {
	readonly status = 'error'
	error: string

	constructor(
		public readonly statusCode: number,
		message: string,
	) {
		super(message)
	}
}

export class NotFoundError extends HttpError {
	constructor(message = 'Not found') {
		super(404, message)
		this.error = 'NOT_FOUND'
	}
}

export class BadRequestError extends HttpError {
	readonly errors: Record<string, string[]>

	constructor(
		errors: Record<string, string[]>,
		message = 'Invalid Request Body',
	) {
		super(400, message)
		this.error = 'BAD_REQUEST'
		this.errors = errors
	}
}

export class ConflictError extends HttpError {
	constructor(message = 'Conflict') {
		super(409, message)
		this.error = 'CONFLICT'
	}
}

export class InternalServerError extends HttpError {
	constructor(message = 'Internal Server Error') {
		super(500, message)
		this.error = 'INTERNAL_SERVER_ERROR'
	}
}

export class UnauthorizedError extends HttpError {
	constructor(message = 'This action requires authentication') {
		super(401, message)
		this.error = 'UNAUTHORIZED'
	}
}

export class ForbiddenError extends HttpError {
	constructor(message = 'Forbidden') {
		super(403, message)
		this.error = 'FORBIDDEN'
	}
}
