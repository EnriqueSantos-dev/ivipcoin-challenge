import { User, UserProps } from '@/entities/user/user.entity'

import { UsersRepository } from '@/repositories/users/users.repository'

import { database } from '@/config/database'

export class AceBaseUsersRepository implements UsersRepository {
	private readonly aceBaseClient = database

	async create(data: {
		id: string
		name: string
		email: string
		password: string
	}): Promise<User> {
		const user = new User(data)
		await this.aceBaseClient.ref('users').push(user)
		return user
	}

	async getUserByEmail(email: string): Promise<User | null> {
		const [userDb] = await this.aceBaseClient
			.query('users')
			.filter('email', '==', email)
			.get<UserProps[]>()

		if (!userDb) return null

		return new User(userDb.val() as UserProps)
	}

	async getUserById(id: string): Promise<User | null> {
		const [userDb] = await this.aceBaseClient
			.query('users')
			.filter('id', '==', id)
			.get<UserProps[]>()

		if (!userDb) return null

		return new User(userDb.val() as UserProps)
	}
}
