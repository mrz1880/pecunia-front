import type {
  AddCategoryToBankAccount,
  AddedCategoryToBankAccount,
  Category,
} from "../../Interfaces/Category"
import type { BankAccount } from "@/Interfaces/BankAccount"

export interface CategoryRepository {
  save(
    addCategoryToBankAccount: AddCategoryToBankAccount
  ): Promise<AddedCategoryToBankAccount>

  findByBankAccountId(id: BankAccount["id"]): Promise<Category[]>
}
