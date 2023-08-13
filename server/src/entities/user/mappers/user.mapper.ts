import { User, UserProps } from '@/entities/user/user.entity'

export abstract class UserMapper {
	static toEntity(data: UserProps): User {
		return new User(data)
	}

	static toView(user: User) {
		return {
			id: user.id,
			name: user.getName(),
			email: user.getEmail(),
		}
	}

	static toPersistence(user: User) {
		return {
			id: user.id,
			name: user.getName(),
			email: user.getEmail(),
			password: user.getPassword(),
		}
	}
}
