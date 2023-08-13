import { TodoNotFoundError } from '@/entities/todo/errors'
import { TodoMapper } from '@/entities/todo/mappers/todo.mapper'
import { Todo, TodoProps } from '@/entities/todo/todo.entity'

import { database } from '@/config/database'

import {
	CreateTodoDTO,
	GetAllTodoInputDTO,
	GetAllTodoOutPutDTO,
	TodoRepository,
	UpdateTodoDTO,
} from './todo.repository'

export class AceBaseTodoRepository implements TodoRepository {
	private aceBaseClient = database

	async getAll({
		page = 1,
		limit = 10,
		userId,
	}: GetAllTodoInputDTO): Promise<GetAllTodoOutPutDTO> {
		const take = limit
		const skip = page === 1 ? 0 : page * take - limit

		const allTodosCount = await this.aceBaseClient
			.query(`todos/${userId}`)
			.count()

		const totalPages = Math.ceil(allTodosCount / take)

		const todosDb = await this.aceBaseClient
			.query(`todos/${userId}`)
			.take(take)
			.skip(skip)
			.get()

		const hasNextPage = page < totalPages
		const hasPreviousPage = page > 1 && page <= totalPages
		const nextPage = hasNextPage ? page + 1 : null
		const previousPage = hasPreviousPage ? page - 1 : null
		const count = todosDb?.length ?? 0

		const paginationInfo = {
			totalPages,
			count,
			page,
			hasNextPage,
			nextPage,
			hasPreviousPage,
			previousPage,
		}

		return {
			todos:
				todosDb?.map((todoDb) =>
					TodoMapper.toEntity(todoDb.val() as TodoProps),
				) ?? [],
			paginationInfo,
		}
	}

	async getTodoByUserIdAndId(userId: string, id: string): Promise<Todo | null> {
		const todoDb = await this.aceBaseClient.ref(`todos/${userId}/${id}`).get()

		if (!todoDb.exists()) return null

		const todoData = todoDb.val<TodoProps>()
		return todoData ? TodoMapper.toEntity(todoData) : null
	}

	async create(data: CreateTodoDTO): Promise<Todo> {
		const todo = new Todo(data)
		await this.aceBaseClient
			.ref(`todos/${data.userId}/${todo.id}`)
			.set(TodoMapper.toPersistence(todo))

		return todo
	}

	async update(todo: Todo, data: UpdateTodoDTO): Promise<Todo> {
		todo.updateAll(data)
		await this.aceBaseClient.ref(`todos/${todo.userId}/${todo.id}`).update(todo)
		return todo
	}

	async delete(userId: string, id: string): Promise<void> {
		await this.aceBaseClient.ref(`todos/${userId}/${id}`).remove()
	}

	async toggleCompleted(userId: string, id: string): Promise<Todo> {
		const todo = await this.getTodoByUserIdAndId(userId, id)

		if (!todo) throw new TodoNotFoundError()

		todo.toggleCompleted()
		await this.aceBaseClient.ref(`todos/${userId}/${id}`).update(todo)

		return todo
	}
}
