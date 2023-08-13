import { NotFoundError } from '@/helpers/http-error'

export class TodoNotFoundError extends NotFoundError {
	constructor(message = 'A tarefa não foi encontrada') {
		super(message)
	}
}
