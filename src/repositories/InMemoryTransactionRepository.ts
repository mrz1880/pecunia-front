import type { TransactionRepository } from "./interfaces/TransactionRepository"
import type {
  AddedTransactionToBankAccount,
  AddTransactionToBankAccount,
  Transaction,
} from "../Interfaces/Transaction"

export class InMemoryTransactionRepository implements TransactionRepository {
  transactions: Transaction[] = []

  async save(
    param: AddTransactionToBankAccount
  ): Promise<AddedTransactionToBankAccount> {
    const addedTransaction = {
      id: this.transactions.length + 1,
      ...param,
    }
    this.transactions.push(addedTransaction)
    return addedTransaction
  }
}
