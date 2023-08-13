import { TodoNotFoundError } from '@/entities/todo/errors'
import { Todo } from '@/entities/todo/todo.entity'

import {
	CreateTodoDTO,
	GetAllTodoOutPutDTO,
	TodoRepository,
	UpdateTodoDTO,
} from '@/repositories/todos/todo.repository'

export class TodosService {
	constructor(private readonly todoRepository: TodoRepository) {}

	async getTodoByUserIdAndId(userId: string, id: string): Promise<Todo | null> {
		return this.todoRepository.getTodoByUserIdAndId(userId, id)
	}

	async getAll(
		userId: string,
		page?: number,
		limit?: number,
	): Promise<GetAllTodoOutPutDTO> {
		return this.todoRepository.getAll({ page, limit, userId })
	}

	async create(data: CreateTodoDTO): Promise<Todo> {
		return await this.todoRepository.create(data)
	}

	async update(data: UpdateTodoDTO): Promise<Todo> {
		const todo = await this.todoRepository.getTodoByUserIdAndId(
			data.userId,
			data.id,
		)

		if (!todo) throw new TodoNotFoundError()

		return this.todoRepository.update(todo, data)
	}

	async delete(userId: string, id: string): Promise<void> {
		const todoExist = await this.todoRepository.getTodoByUserIdAndId(userId, id)

		if (!todoExist) throw new TodoNotFoundError()

		await this.todoRepository.delete(userId, id)
	}

	async toggleCompleted(userId: string, id: string): Promise<Todo> {
		const todo = await this.todoRepository.getTodoByUserIdAndId(userId, id)

		if (!todo) throw new TodoNotFoundError()

		return this.todoRepository.toggleCompleted(userId, id)
	}
}
