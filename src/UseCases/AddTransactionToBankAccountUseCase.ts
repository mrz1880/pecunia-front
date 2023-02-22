import type { BankAccountRepository } from "@/repositories/interfaces/BankAccountRepository"
import type { TransactionRepository } from "@/repositories/interfaces/TransactionRepository"
import type {
  AddedTransactionToBankAccount,
  AddTransactionToBankAccount,
} from "@/Interfaces/Transaction"
import type { CategoryRepository } from "@/repositories/interfaces/CategoryRepository"

export class AddTransactionToBankAccountUseCase {
  private bankAccountRepository: BankAccountRepository
  private transactionRepository: TransactionRepository
  private categoryRepository: CategoryRepository

  constructor(
    bankAccountRepository: BankAccountRepository,
    transactionRepository: TransactionRepository,
    categoryRepository: CategoryRepository
  ) {
    this.bankAccountRepository = bankAccountRepository
    this.transactionRepository = transactionRepository
    this.categoryRepository = categoryRepository
  }

  async execute(
    addTransactionToBankAccount: AddTransactionToBankAccount
  ): Promise<AddedTransactionToBankAccount> {
    if (addTransactionToBankAccount.amount === 0) {
      throw new Error("Transaction amount cannot be zero")
    }
    if (!addTransactionToBankAccount.description) {
      throw new Error("Transaction description is required")
    }
    const bankAccount = await this.bankAccountRepository.findById(
      addTransactionToBankAccount.bankAccountId
    )

    if (!bankAccount) {
      throw new Error("Bank account not found")
    }
    const category = await this.categoryRepository.findById(
      addTransactionToBankAccount.categoryId
    )
    if (!category || category.bankAccountId !== bankAccount.id) {
      throw new Error("Category not found")
    }

    return this.transactionRepository.save(addTransactionToBankAccount)
  }
}
