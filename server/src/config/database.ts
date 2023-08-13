import { AceBase } from 'acebase'

import { env } from './env'

export const database = new AceBase(env.databaseName as string, {
	storage: {
		path: '.acebase',
	},
	logLevel: 'log',
})

export async function initDatabase() {
	try {
		await database.ready(async () => {
			await Promise.all([
				database.indexes.create('todos', 'userId'),
				database.indexes.create('users', 'email'),
				database.indexes.create('users', 'id'),
			])
		})
	} catch (error) {
		console.log(error)
		throw new Error('Error creating database')
	}
}
