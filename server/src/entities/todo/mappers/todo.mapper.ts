import { Todo, TodoProps } from '@/entities/todo/todo.entity'

export abstract class TodoMapper {
	static toEntity(data: Required<TodoProps>): Todo {
		return new Todo({
			...data,
			createdAt: new Date(data.createdAt),
			updatedAt: new Date(data.updatedAt),
		})
	}

	static toView(todo: Todo) {
		return {
			id: todo.id,
			userId: todo.userId,
			title: todo.getTitle(),
			description: todo.getDescription(),
			completed: todo.getCompleted(),
			createdAt: todo.getCreatedAt().toISOString(),
			updatedAt: todo.getUpdatedAt().toISOString(),
		}
	}

	static toPersistence(todo: Todo) {
		return {
			id: todo.id,
			userId: todo.userId,
			title: todo.getTitle(),
			description: todo.getDescription(),
			completed: todo.getCompleted(),
			createdAt: todo.getCreatedAt().toISOString(),
			updatedAt: todo.getUpdatedAt().toISOString(),
		}
	}
}
