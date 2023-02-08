import type {
  AddedTransactionToBankAccount,
  AddTransactionToBankAccount,
} from "../../Interfaces/Transaction"

export interface TransactionRepository {
  save(
    param: AddTransactionToBankAccount
  ): Promise<AddedTransactionToBankAccount>
}
