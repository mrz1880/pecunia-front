import type {
  CreatedUser,
  CreateUser,
  LoginUser,
  Tokens,
  User,
} from "@/Interfaces/User"
import type { UserRepository } from "./interfaces/UserRepository"

interface TokenHelper {
  generateTokens(user: User): Tokens

  decodeToken(accessToken: string): User

  storeTokensInLocalStorage(value: Tokens | undefined): void
}

class InMemoryTokenHelper implements TokenHelper {
  generateTokens(user: User): Tokens {
    return {
      accessToken: "accessToken+" + JSON.stringify(user),
      refreshToken: "refreshToken+" + JSON.stringify(user),
    }
  }

  decodeToken(accessToken: string): User {
    const [, payload] = accessToken.split("+")
    return JSON.parse(payload)
  }

  storeTokensInLocalStorage(value: Tokens | undefined) {
    localStorage.setItem("tokens", JSON.stringify(value))
  }
}

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []
  private tokenHelper: TokenHelper

  constructor(
    users: User[] = [],
    tokenHelper: TokenHelper = defaultTokenHelper
  ) {
    this.users = users
    this.tokenHelper = tokenHelper
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

    return this.tokenHelper.generateTokens(user)
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

export const defaultTokenHelper = new InMemoryTokenHelper()
export const userRepository = new InMemoryUserRepository(usersByEnv[env])
