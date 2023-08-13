import { Todo } from '@/entities/todo/todo.entity'

export interface CreateTodoDTO {
	userId: string
	title: string
	description: string
	completed: boolean
}

export type UpdateTodoDTO = Partial<Omit<CreateTodoDTO, 'userId'>> & {
	id: string
	userId: string
}

export type GetAllTodoInputDTO = {
	page?: number
	limit?: number
	userId: string
}

export type GetAllTodoOutPutDTO = {
	todos: Todo[]
	paginationInfo: {
		totalPages: number
		hasNextPage: boolean
		hasPreviousPage: boolean
		nextPage: number | null
		previousPage: number | null
		page: number
		count: number
	}
}

export interface TodoRepository {
	create(data: CreateTodoDTO): Promise<Todo>
	update(todo: Todo, data: UpdateTodoDTO): Promise<Todo>
	delete(userId: string, id: string): Promise<void>
	toggleCompleted(userId: string, id: string): Promise<Todo>
	getAll(data: GetAllTodoInputDTO): Promise<GetAllTodoOutPutDTO>
	getTodoByUserIdAndId(userId: string, id: string): Promise<Todo | null>
}
