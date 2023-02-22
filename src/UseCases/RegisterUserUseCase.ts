import type { CreatedUser, CreateUser } from "@/Interfaces/User"
import type { UserRepository } from "@/repositories/interfaces/UserRepository"

export class RegisterUserUseCase {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(createUser: CreateUser): Promise<CreatedUser> {
    if (!createUser.email.includes("@")) {
      throw new Error("Invalid email")
    }
    if (createUser.password.length < 6) {
      throw new Error("Invalid password")
    }
    return this.userRepository.save(createUser)
  }
}
