import type { CategoryRepository } from "./interfaces/CategoryRepository"
import type {
  AddCategoryToBankAccount,
  AddedCategoryToBankAccount,
  Category,
} from "../Interfaces/Category"
import type { BankAccount } from "@/Interfaces/BankAccount"

export class InMemoryCategoryRepository implements CategoryRepository {
  categories: Category[] = []

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

  async findByBankAccountId(id: BankAccount["id"]): Promise<Category[]> {
    return this.categories.filter((category) => category.bankAccountId === id)
  }

  async findById(categoryId: Category["id"]): Promise<Category> {
    const category = this.categories.find(
      (category) => category.id === categoryId
    )
    if (!category) {
      throw new Error("Category not found")
    }
    return category
  }
}
