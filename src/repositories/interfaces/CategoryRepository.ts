import type {
  AddCategoryToBankAccount,
  AddedCategoryToBankAccount,
} from "../../Interfaces/Category"

export interface CategoryRepository {
  save(
    addCategoryToBankAccount: AddCategoryToBankAccount
  ): Promise<AddedCategoryToBankAccount>
}
