import type {
  AddedReccurentTransactionToBankAccount,
  AddReccurentTransactionToBankAccount,
} from "../../Interfaces/RecurrentTransaction"

export interface RecurrentTransactionRepository {
  save(
    addReccurentTransactionToBankAccount: AddReccurentTransactionToBankAccount
  ): Promise<AddedReccurentTransactionToBankAccount>
}
