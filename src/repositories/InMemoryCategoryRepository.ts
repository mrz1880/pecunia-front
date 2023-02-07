import type { CategoryRepository } from "./interfaces/CategoryRepository"
import type {
  AddCategoryToBankAccount,
  AddedCategoryToBankAccount,
  Categories,
} from "../Interfaces/Category"

export class InMemoryCategoryRepository implements CategoryRepository {
  categories: Categories[] = []

  async save(
    addCategoryToBankAccount: AddCategoryToBankAccount
  ): Promise<AddedCategoryToBankAccount> {
    const addedCategory = {
      id: this.categories.length + 1,
      ...addCategoryToBankAccount,
    }
    const categoryAlreadyExists = this.categories.find(
      (category) =>
        category.name === addedCategory.name &&
        category.bankAccountId === addedCategory.bankAccountId
    )
    if (categoryAlreadyExists) {
      throw new Error("Category already exists")
    }
    this.categories.push(addedCategory)
    return addedCategory
  }
}
