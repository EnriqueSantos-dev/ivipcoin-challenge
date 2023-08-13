import { Request, Response } from 'express'
import { z } from 'zod'

import { TodosService } from '@/services/todos.service'

import { mapZodErrorsToFieldMessages } from '@/utils/zod-mapper'

import { BadRequestError } from '@/helpers/http-error'

export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	async getAll(req: Request, res: Response) {
		const getAllTodoSchema = z.object({
			page: z.coerce.number().int().min(1).optional(),
			limit: z.coerce.number().int().min(1).max(50).optional(),
			userId: z.string().min(1),
		})

		const resultParsed = getAllTodoSchema.safeParse({
			userId: req.user?.id,
			...req.body,
			...req.query,
		})

		if (!resultParsed.success) {
			return res
				.status(400)
				.json({ erros: mapZodErrorsToFieldMessages(resultParsed.error) })
		}

		const { userId, page, limit } = resultParsed.data

		const todos = await this.todosService.getAll(userId, page, limit)

		return res.status(200).json(todos)
	}

	async create(req: Request, res: Response) {
		const createTodoSchema = z.object({
			title: z.string().min(3).max(255),
			description: z.string().min(3).max(255),
			completed: z.boolean(),
			userId: z.string().min(1),
		})

		const resultParsed = createTodoSchema.safeParse({
			userId: req.user?.id,
			...req.body,
			...req.params,
		})

		if (!resultParsed.success)
			throw new BadRequestError(mapZodErrorsToFieldMessages(resultParsed.error))

		const { title, completed, description, userId } = resultParsed.data

		const todo = await this.todosService.create({
			title,
			description,
			completed,
			userId,
		})
		return res.status(201).json(todo)
	}

	async update(req: Request, res: Response) {
		const updateTodoSchema = z.object({
			id: z.string().uuid(),
			title: z.string().min(3).max(255).optional(),
			description: z.string().min(3).max(255).optional(),
			completed: z.boolean().optional(),
			userId: z.string().min(1),
		})

		const resultParsed = updateTodoSchema.safeParse({
			userId: req.user?.id,
			...req.body,
			...req.params,
		})

		if (!resultParsed.success)
			throw new BadRequestError(mapZodErrorsToFieldMessages(resultParsed.error))

		const todoUpdated = await this.todosService.update(resultParsed.data)

		return res.status(200).json(todoUpdated)
	}

	async delete(req: Request, res: Response) {
		const deleteTodoSchema = z.object({
			id: z.string().uuid(),
			userId: z.string().min(1),
		})

		const resultParsed = deleteTodoSchema.safeParse({
			userId: req.user?.id,
			...req.params,
		})

		if (!resultParsed.success)
			throw new BadRequestError(mapZodErrorsToFieldMessages(resultParsed.error))

		const { id, userId } = resultParsed.data
		await this.todosService.delete(userId, id)

		return res.status(204).json()
	}

	async toggleCompleted(req: Request, res: Response) {
		const toggleCompletedSchema = z.object({
			id: z.string().uuid(),
			userId: z.string().min(1),
		})

		const resultParsed = toggleCompletedSchema.safeParse({
			userId: req.user?.id,
			...req.params,
		})

		if (!resultParsed.success)
			throw new BadRequestError(mapZodErrorsToFieldMessages(resultParsed.error))

		const { id, userId } = resultParsed.data
		const todo = await this.todosService.toggleCompleted(userId, id)

		return res.status(200).json(todo)
	}
}
