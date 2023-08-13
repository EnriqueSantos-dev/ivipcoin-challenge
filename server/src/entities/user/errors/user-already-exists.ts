import { ConflictError } from '@/helpers/http-error'

export class UserAlreadyExistsError extends ConflictError {
	constructor() {
		super('O usuário já existe')
	}
}
