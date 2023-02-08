import type { BankAccountRepository } from "../repositories/interfaces/BankAccountRepository"
import type { RecurrentTransactionRepository } from "../repositories/interfaces/RecurrentTransactionRepository"
import type {
  AddedReccurentTransactionToBankAccount,
  AddReccurentTransactionToBankAccount,
} from "../Interfaces/RecurrentTransaction"

export class AddRecurrentTransactionToBankAccountUseCase {
  private bankAccountRepository: BankAccountRepository
  private reccurentTransactionRepository: RecurrentTransactionRepository

  constructor(
    bankAccountRepository: BankAccountRepository,
    reccurentTransactionRepository: RecurrentTransactionRepository
  ) {
    this.bankAccountRepository = bankAccountRepository
    this.reccurentTransactionRepository = reccurentTransactionRepository
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
    return this.reccurentTransactionRepository.save(
      addReccurentTransactionToBankAccount
    )
  }
}
