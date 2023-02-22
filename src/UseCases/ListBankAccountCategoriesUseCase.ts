import type { BankAccountRepository } from "@/repositories/interfaces/BankAccountRepository"
import type { CategoryRepository } from "@/repositories/interfaces/CategoryRepository"
import type { BankAccount } from "@/Interfaces/BankAccount"
import type { Category } from "@/Interfaces/Category"

export class ListBankAccountCategoriesUseCase {
  private bankAccountRepository: BankAccountRepository
  private categoryRepository: CategoryRepository

  constructor(
    bankAccountRepository: BankAccountRepository,
    categoryRepository: CategoryRepository
  ) {
    this.bankAccountRepository = bankAccountRepository
    this.categoryRepository = categoryRepository
  }

  async execute(params: {
    bankAccountId: BankAccount["id"]
  }): Promise<Category[]> {
    const bankAccount = await this.bankAccountRepository.findById(
      params.bankAccountId
    )
    if (!bankAccount) {
      throw new Error("Bank account not found")
    }
    return this.categoryRepository.findByBankAccountId(params.bankAccountId)
  }
}
