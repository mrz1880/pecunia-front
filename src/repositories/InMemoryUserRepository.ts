import type { CreatedUser, CreateUser } from "../Interfaces/User"
import type { UserRepository } from "./interfaces/UserRepository"

interface User {
  id: number
  email: string
  password: string
}

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []

  async save(createUser: CreateUser): Promise<CreatedUser> {
    const { password, ...user } = {
      id: this.users.length + 1,
      ...createUser,
    }
    const userAlreadyRegistered = this.users.find(
      (user) => user.email === createUser.email
    )
    if (userAlreadyRegistered) {
      throw new Error("Email already registered")
    }
    this.users.push({ password, ...user })
    return user
  }
}
