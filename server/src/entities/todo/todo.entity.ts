import { randomUUID } from 'crypto'

export type TodoProps = {
	id?: string | null
	title: string
	description: string
	completed: boolean
	userId: string
	createdAt?: Date
	updatedAt?: Date
}

export class Todo {
	readonly id: string
	private title: string
	private description: string
	private completed: boolean
	readonly userId: string
	private createdAt: Date
	private updatedAt: Date

	constructor(props: TodoProps) {
		Object.assign(this, {
			...props,
			id: props.id ?? randomUUID(),
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
		})
	}

	toggleCompleted() {
		this.completed = !this.completed
	}

	updateAll(props: {
		title?: string
		description?: string
		completed?: boolean
	}) {
		this.title = props.title ?? this.title
		this.description = props.description ?? this.description
		this.completed = props.completed ?? this.completed
		this.updatedAt = new Date()
	}

	getTitle() {
		return this.title
	}

	getDescription() {
		return this.description
	}

	getCompleted() {
		return this.completed
	}

	getUserId() {
		return this.userId
	}

	getCreatedAt() {
		return this.createdAt
	}

	getUpdatedAt() {
		return this.updatedAt
	}
}
