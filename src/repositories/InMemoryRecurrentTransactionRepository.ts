import type { RecurrentTransactionRepository } from "./interfaces/RecurrentTransactionRepository"
import type {
  AddedReccurentTransactionToBankAccount,
  AddReccurentTransactionToBankAccount,
  RecurrentTransaction,
} from "../Interfaces/RecurrentTransaction"

export class InMemoryRecurrentTransactionRepository
  implements RecurrentTransactionRepository
{
  recurrentTransactions: RecurrentTransaction[] = []

  async save(
    recurrentTransaction: AddReccurentTransactionToBankAccount
  ): Promise<AddedReccurentTransactionToBankAccount> {
    const newRecurrentTransaction = {
      id: this.recurrentTransactions.length + 1,
      ...recurrentTransaction,
    }
    this.recurrentTransactions.push(newRecurrentTransaction)
    return newRecurrentTransaction
  }
}
