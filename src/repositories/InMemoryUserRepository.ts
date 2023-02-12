import type {
  CreatedUser,
  CreateUser,
  LoginUser,
  Tokens,
  User,
} from "@/Interfaces/User"
import type { UserRepository } from "./interfaces/UserRepository"

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []

  constructor(users: User[] = []) {
    this.users = users
  }

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

  async findById(userId: User["id"]): Promise<User> {
    const user = this.users.find((user) => user.id === userId)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }
}

const usersByEnv: Record<string, User[]> = {
  test: [],
  development: [{ id: 1, email: "cypress@pecunia.com", password: "cypress" }],
  production: [],
}

const env = process.env.NODE_ENV ?? "development"

export const userRepository = new InMemoryUserRepository(usersByEnv[env])
