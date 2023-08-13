import { NotFoundError } from '@/helpers/http-error'

export class UserNotFoundError extends NotFoundError {
	constructor() {
		super('O usuário não foi encontrado')
	}
}
