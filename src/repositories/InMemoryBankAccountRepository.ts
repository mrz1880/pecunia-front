import type { BankAccountRepository } from "./interfaces/BankAccountRepository"
import type {
  AddBankAccount,
  AddedBankAccount,
  BankAccount,
} from "../Interfaces/BankAccount"

export class InMemoryBankAccountRepository implements BankAccountRepository {
  bankAccounts: BankAccount[] = []

  async save(bankAccount: AddBankAccount): Promise<AddedBankAccount> {
    const addedBankAccount = {
      id: this.bankAccounts.length + 1,
      ...bankAccount,
    }
    const bankAccountAlreadyExists = this.bankAccounts.find(
      (bankAccount) =>
        bankAccount.name === addedBankAccount.name &&
        bankAccount.userId === addedBankAccount.userId
    )
    if (bankAccountAlreadyExists) {
      throw new Error("Bank account already exists")
    }
    this.bankAccounts.push(addedBankAccount)
    return addedBankAccount
  }
}
