import * as bcrypt from 'bcryptjs'

export class HashService {
	constructor(private readonly salt: number) {}

	async hash(plainText: string): Promise<string> {
		return bcrypt.hash(plainText, this.salt)
	}

	async compare(plainText: string, hash: string): Promise<boolean> {
		return bcrypt.compare(plainText, hash)
	}
}
