import { UserMapper } from '@/entities/user/mappers/user.mapper'

import { JwtService, UsersService } from '@/services'

export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async login(email: string, password: string) {
		const user = await this.usersService.validateUser(email, password)

		const payload = { email: user.getEmail(), sub: user.id }
		const token = await this.jwtService.sign(payload)

		return { token, user: UserMapper.toView(user) }
	}

	async getProfile(id: string) {
		return this.usersService.getProfile(id)
	}
}
