import {
	UserAlreadyExistsError,
	UserInvalidCredentialsError,
	UserNotFoundError,
} from '@/entities/user/errors'
import { UserMapper } from '@/entities/user/mappers/user.mapper'
import { User } from '@/entities/user/user.entity'

import {
	CreateUserDTO,
	UsersRepository,
} from '@/repositories/users/users.repository'

import { HashService } from '@/services'

export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly hashService: HashService,
	) {}

	async createUser(data: CreateUserDTO) {
		const userAlreadyExists = await this.usersRepository.getUserByEmail(
			data.email,
		)

		if (userAlreadyExists) throw new UserAlreadyExistsError()

		const user = await this.usersRepository.create(data)
		return UserMapper.toView(user)
	}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.usersRepository.getUserByEmail(email)

		if (!user) throw new UserNotFoundError()

		const isPasswordValid = await this.hashService.compare(
			password,
			user.getPassword(),
		)

		if (!isPasswordValid) throw new UserInvalidCredentialsError()

		return user
	}
}
