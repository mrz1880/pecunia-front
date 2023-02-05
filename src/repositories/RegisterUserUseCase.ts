import type { CreatedUser, CreateUser } from "../Interfaces/User"
import type { UserRepository } from "@/repositories/interfaces/UserRepository"

export class RegisterUserUseCase {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(createUser: CreateUser): Promise<CreatedUser> {
    // validate email
    if (!createUser.email.includes("@")) {
      throw new Error("Invalid email")
    }
    return this.userRepository.save(createUser)
  }
}
