import type { CreatedUser, CreateUser } from "../Interfaces/User"
import type { UserRepository } from "./interfaces/UserRepository"

export class InMemoryUserRepository implements UserRepository {
  users: CreatedUser[] = []

  save(createUser: CreateUser) {
    const user = {
      id: this.users.length + 1,
      email: createUser.email,
    }
    const userAlreadyRegistered = this.users.find(
      (user) => user.email === createUser.email
    )
    if (userAlreadyRegistered) {
      throw new Error("Email already registered")
    }
    this.users.push(user)
    return user
  }
}
