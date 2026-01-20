import { ResourceNotFoundError } from "../errors"
import { Repository } from "../repository"
import { UserDAO } from "./_dao"
import type { NewUSer, User } from "./user"

class NoSuchUserError extends ResourceNotFoundError {
    constructor(args?: Partial<User>) {
        super("No such user exits", args)
    }
}

class UserRepository extends Repository<User, NewUSer, UserDAO> {

    constructor() { super(UserDAO) }

    async findById(id: number): Promise<User | null> {
        return this.find({ id })
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.find({ email })
    }

    async getPassword(id: number): Promise<string> {
        return (await this.getHiddenProperty(['password'], { id })).password
    }

}

export { UserRepository, NoSuchUserError }
