import type { UserRepository } from "@/repositories/interfaces/UserRepository"
import type { LoginUser, Tokens } from "@/Interfaces/User"

export class LoginUserUseCase {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(loginUser: LoginUser): Promise<Tokens> {
    return this.userRepository.login(loginUser)
  }
}
