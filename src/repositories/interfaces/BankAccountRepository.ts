import type {
  AddBankAccount,
  AddedBankAccount,
  BankAccount,
} from "../../Interfaces/BankAccount"
import type { User } from "@/Interfaces/User"

export interface BankAccountRepository {
  save(bankAccount: AddBankAccount): Promise<AddedBankAccount>

  findByUserId(userId: User["id"]): Promise<BankAccount[]>

  findById(bankAccountId: BankAccount["id"]): Promise<BankAccount>
}
