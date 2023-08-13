import { Router } from 'express'

import { TodosController } from '@/controllers'

import { AceBaseTodoRepository } from '@/repositories/todos'

import { TodosService } from '@/services'

import { requireAuthenticated } from '@/middlewares'

const todosRepository = new AceBaseTodoRepository()
const todosService = new TodosService(todosRepository)
const todoController = new TodosController(todosService)

const todosRoutes = Router()

todosRoutes.use(requireAuthenticated)
todosRoutes.post('/', (req, res) => todoController.create(req, res))
todosRoutes.get('/', (req, res) => todoController.getAll(req, res))
todosRoutes.put('/:id', (req, res) => todoController.update(req, res))
todosRoutes.delete('/:id', (req, res) => todoController.delete(req, res))
todosRoutes.patch('/:id/toggle-completed', (req, res) =>
	todoController.toggleCompleted(req, res),
)

export { todosRoutes }
