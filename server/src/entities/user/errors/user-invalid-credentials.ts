import { UnauthorizedError } from '@/helpers/http-error'

export class UserInvalidCredentialsError extends UnauthorizedError {
	constructor() {
		super('O e-mail ou a senha estão incorretos')
	}
}
