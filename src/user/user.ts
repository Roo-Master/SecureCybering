type UserRole = 'admin' | 'user'

type User = {
    id: number,
    name: string
    email: string
    role: UserRole
}

type NewUser = Omit<User, 'id'> & {
    password: String
}

type UserUpdate = Partial<NewUser>

export type { UserRole, User, NewUser, UserUpdate }
