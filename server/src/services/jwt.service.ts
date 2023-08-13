import jwt from 'jsonwebtoken'

export class JwtService {
	constructor(
		private readonly secret: string,
		private readonly expiresIn: string,
	) {}

	async sign(payload: { sub: string; email: string }) {
		return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
	}

	async verify(token: string) {
		return jwt.verify(token, this.secret)
	}
}
