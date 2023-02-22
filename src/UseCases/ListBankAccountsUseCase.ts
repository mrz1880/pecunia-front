import type { UserRepository } from "@/repositories/interfaces/UserRepository"
import type { BankAccountRepository } from "@/repositories/interfaces/BankAccountRepository"
import type { User } from "@/Interfaces/User"
import type { BankAccount } from "@/Interfaces/BankAccount"

export class ListBankAccountsUseCase {
  private userRepository: UserRepository
  private bankAccountRepository: BankAccountRepository

  constructor(
    userRepository: UserRepository,
    bankAccountRepository: BankAccountRepository
  ) {
    this.userRepository = userRepository
    this.bankAccountRepository = bankAccountRepository
  }

  async execute(param: { userId: User["id"] }): Promise<BankAccount[]> {
    const user = await this.userRepository.findById(param.userId)
    if (!user) {
      throw new Error("User not found")
    }
    return this.bankAccountRepository.findByUserId(param.userId)
  }
}
