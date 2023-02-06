import type {
  CreatedUser,
  CreateUser,
  LoginUser,
  Tokens,
} from "../Interfaces/User"
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

  async login(loginUser: LoginUser): Promise<Tokens> {
    const user = this.users.find(
      (user) =>
        user.email === loginUser.email && user.password === loginUser.password
    )
    if (!user) {
      throw new Error("Invalid credentials")
    }

    return {
      accessToken: "accessToken" + user.email,
      refreshToken: "refreshToken" + user.email,
    }
  }
}
