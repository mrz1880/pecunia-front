import type {
  AddBankAccount,
  AddedBankAccount,
} from "../../Interfaces/BankAccount"

export interface BankAccountRepository {
  save(bankAccount: AddBankAccount): Promise<AddedBankAccount>
}
