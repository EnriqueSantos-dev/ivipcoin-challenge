import { randomUUID } from 'crypto'

export type UserProps = {
	id?: string
	name: string
	email: string
	password: string
}

export class User {
	readonly id: string
	private name: string
	private email: string
	private password: string

	constructor(props: UserProps) {
		Object.assign(this, {
			...props,
			id: props.id ?? randomUUID(),
		})
	}

	getName() {
		return this.name
	}

	getEmail() {
		return this.email
	}

	getPassword() {
		return this.password
	}

	setName(name: string) {
		this.name = name
	}

	setEmail(email: string): void {
		this.email = email
	}

	setPassword(password: string): void {
		this.password = password
	}
}
