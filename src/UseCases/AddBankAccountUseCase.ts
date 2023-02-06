import type { BankAccountRepository } from "../repositories/interfaces/BankAccountRepository"
import type { UserRepository } from "../repositories/interfaces/UserRepository"
import type {
  AddBankAccount,
  AddedBankAccount,
} from "../Interfaces/BankAccount"

export class AddBankAccountUseCase {
  private bankAccountRepository: BankAccountRepository
  private userRepository: UserRepository

  constructor(
    userRepository: UserRepository,
    bankAccountRepository: BankAccountRepository
  ) {
    this.bankAccountRepository = bankAccountRepository
    this.userRepository = userRepository
  }

  async execute(bankAccount: AddBankAccount): Promise<AddedBankAccount> {
    const user = await this.userRepository.findById(bankAccount.userId)
    if (!user) {
      throw new Error("User not found")
    }

    if (!bankAccount.name) {
      throw new Error("Bank account name is required")
    }

    return this.bankAccountRepository.save(bankAccount)
  }
}
