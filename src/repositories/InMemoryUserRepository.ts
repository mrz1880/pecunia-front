import type { CreateUser } from "../Interfaces/User"
import type { UserRepository } from "./interfaces/UserRepository"

export class InMemoryUserRepository implements UserRepository {
  save(createUser: CreateUser) {
    return {
      id: 1,
      email: createUser.email,
    }
  }
}
