import { JwtService, UsersService } from '@/services'

export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async login(email: string, password: string) {
		const user = await this.usersService.validateUser(email, password)
		const payload = { email: user.getEmail(), sub: user.id }
		return this.jwtService.sign(payload)
	}
}
