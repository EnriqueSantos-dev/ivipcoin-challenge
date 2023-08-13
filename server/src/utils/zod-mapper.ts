import { ZodError, ZodIssue } from 'zod'

interface ZodValidationError {
	[field: string]: string[]
}

export function mapZodErrorsToFieldMessages(
	error: ZodError,
): ZodValidationError {
	const fieldMessages: ZodValidationError = {}

	error.issues.forEach((issue: ZodIssue) => {
		const { path, message } = issue
		const field = path.join('.') // Convert array path to dot-separated string

		if (!fieldMessages[field]) {
			fieldMessages[field] = []
		}

		fieldMessages[field].push(message)
	})

	return fieldMessages
}
