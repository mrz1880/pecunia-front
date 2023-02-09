import type { BankAccountRepository } from "../repositories/interfaces/BankAccountRepository"
import type { TransactionRepository } from "../repositories/interfaces/TransactionRepository"
import type {
  AddedTransactionToBankAccount,
  AddTransactionToBankAccount,
} from "../Interfaces/Transaction"

export class AddTransactionToBankAccountUseCase {
  private bankAccountRepository: BankAccountRepository
  private transactionRepository: TransactionRepository

  constructor(
    bankAccountRepository: BankAccountRepository,
    transactionRepository: TransactionRepository
  ) {
    this.bankAccountRepository = bankAccountRepository
    this.transactionRepository = transactionRepository
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
    return this.transactionRepository.save(addTransactionToBankAccount)
  }
}
