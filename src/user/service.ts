import type { Query } from "../repository"
import { UserRepository } from "./_repository"
import type { User, UserUpdate } from "./user"

class UserService extends UserRepository {

    override async update(query: Query<User>, update: UserUpdate): Promise<number> {
        return super.update(query, update)
    }
    
}

const service = new UserService()

export { service as UserService }
