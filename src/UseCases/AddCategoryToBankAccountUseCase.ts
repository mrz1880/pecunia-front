import type { BankAccountRepository } from "@/repositories/interfaces/BankAccountRepository"
import type { CategoryRepository } from "@/repositories/interfaces/CategoryRepository"
import type {
  AddCategoryToBankAccount,
  AddedCategoryToBankAccount,
} from "@/Interfaces/Category"

export class AddCategoryToBankAccountUseCase {
  private bankAccountRepository: BankAccountRepository
  private categoryRepository: CategoryRepository

  constructor(
    bankAccountRepository: BankAccountRepository,
    categoryRepository: CategoryRepository
  ) {
    this.bankAccountRepository = bankAccountRepository
    this.categoryRepository = categoryRepository
  }

  async execute(
    addCategoryToBankAccount: AddCategoryToBankAccount
  ): Promise<AddedCategoryToBankAccount> {
    if (!addCategoryToBankAccount.name) {
      throw new Error("Category name is required")
    }

    const bankAccount = await this.bankAccountRepository.findById(
      addCategoryToBankAccount.bankAccountId
    )
    if (!addCategoryToBankAccount.bankAccountId || !bankAccount) {
      throw new Error("Bank account not found")
    }
    return this.categoryRepository.save(addCategoryToBankAccount)
  }
}
