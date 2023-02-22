import type { BankAccountRepository } from "@/repositories/interfaces/BankAccountRepository"
import type { RecurrentTransactionRepository } from "@/repositories/interfaces/RecurrentTransactionRepository"
import type {
  AddedReccurentTransactionToBankAccount,
  AddReccurentTransactionToBankAccount,
} from "@/Interfaces/RecurrentTransaction"
import type { CategoryRepository } from "@/repositories/interfaces/CategoryRepository"

export class AddRecurrentTransactionToBankAccountUseCase {
  private bankAccountRepository: BankAccountRepository
  private reccurentTransactionRepository: RecurrentTransactionRepository
  private categoryRepository: CategoryRepository

  constructor(
    bankAccountRepository: BankAccountRepository,
    reccurentTransactionRepository: RecurrentTransactionRepository,
    categoryRepository: CategoryRepository
  ) {
    this.bankAccountRepository = bankAccountRepository
    this.reccurentTransactionRepository = reccurentTransactionRepository
    this.categoryRepository = categoryRepository
  }

  async execute(
    addReccurentTransactionToBankAccount: AddReccurentTransactionToBankAccount
  ): Promise<AddedReccurentTransactionToBankAccount> {
    if (!addReccurentTransactionToBankAccount.name) {
      throw new Error("Recurrent transaction name is required")
    }
    if (addReccurentTransactionToBankAccount.amount === 0) {
      throw new Error("Recurrent transaction amount cannot be zero")
    }
    const bankAccount = await this.bankAccountRepository.findById(
      addReccurentTransactionToBankAccount.bankAccountId
    )
    if (!bankAccount) {
      throw new Error("Bank account not found")
    }
    const category = await this.categoryRepository.findById(
      addReccurentTransactionToBankAccount.categoryId
    )
    if (!category) {
      throw new Error("Category not found")
    }
    return this.reccurentTransactionRepository.save(
      addReccurentTransactionToBankAccount
    )
  }
}
