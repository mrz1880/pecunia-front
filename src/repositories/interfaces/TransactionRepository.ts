import type {
  AddedTransactionToBankAccount,
  AddTransactionToBankAccount,
} from "../../Interfaces/Transaction"

export interface TransactionRepository {
  save(
    addTransactionToBankAccount: AddTransactionToBankAccount
  ): Promise<AddedTransactionToBankAccount>
}
