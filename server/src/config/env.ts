import * as dotEnv from 'dotenv-safe'

dotEnv.config()

export const env = {
	port: process.env.PORT as string,
	clientUrl: process.env.CLIENT_URL as string,
	databaseName: process.env.DATABASE_NAME as string,
	hashSalt: process.env.HASH_SALT as string,
	jwt: {
		expiresIn: process.env.JWT_EXPIRES_IN as string,
		secret: process.env.JWT_SECRET as string,
	},
}
