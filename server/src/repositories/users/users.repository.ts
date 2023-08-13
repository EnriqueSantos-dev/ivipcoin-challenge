import { User } from '@/entities/user/user.entity'

export type CreateUserDTO = {
	name: string
	email: string
	password: string
}

export interface UsersRepository {
	create(data: CreateUserDTO): Promise<User>
	getUserByEmail(email: string): Promise<User | null>
	getUserById(id: string): Promise<User | null>
}
