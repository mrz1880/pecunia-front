import type { BankAccountRepository } from "./interfaces/BankAccountRepository"
import type {
  AddBankAccount,
  AddedBankAccount,
  BankAccount,
} from "../Interfaces/BankAccount"
import type { User } from "@/Interfaces/User"

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

  async findByUserId(userId: User["id"]): Promise<BankAccount[]> {
    return this.bankAccounts.filter(
      (bankAccount) => bankAccount.userId === userId
    )
  }

  async findById(bankAccountId: BankAccount["id"]): Promise<BankAccount> {
    const bankAccount = this.bankAccounts.find(
      (bankAccount) => bankAccount.id === bankAccountId
    )
    if (!bankAccount) {
      throw new Error("Bank account not found")
    }
    return bankAccount
  }
}

export const bankAccountRepository = new InMemoryBankAccountRepository()
