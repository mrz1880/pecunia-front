import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { InMemoryCategoryRepository } from "../repositories/InMemoryCategoryRepository"
import { AddCategoryToBankAccountUseCase } from "../UseCases/AddCategoryToBankAccountUseCase"

describe("Add Category To Bank Account", () => {
  let bankAccountRepository: InMemoryBankAccountRepository
  let categoryRepository: InMemoryCategoryRepository
  let addCategoryToBankAccountUseCase: AddCategoryToBankAccountUseCase

  beforeEach(() => {
    bankAccountRepository = new InMemoryBankAccountRepository()
    categoryRepository = new InMemoryCategoryRepository()
    addCategoryToBankAccountUseCase = new AddCategoryToBankAccountUseCase(
      bankAccountRepository,
      categoryRepository
    )
  })

  it("should add a category to a bank account", async () => {
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const addCategoryToBankAccount = {
      bankAccountId: existingBankAccount.id,
      name: "My Category",
    }
    const addedCategory = await addCategoryToBankAccountUseCase.execute(
      addCategoryToBankAccount
    )
    expect(addedCategory).toHaveProperty("id")
    expect(addedCategory.name).toBe(addCategoryToBankAccount.name)
    expect(addedCategory.bankAccountId).toBe(
      addCategoryToBankAccount.bankAccountId
    )
  })

  it("should throw an error if the bank account does not exist", async () => {
    await expect(
      addCategoryToBankAccountUseCase.execute({
        bankAccountId: 1,
        name: "My Category",
      })
    ).rejects.toThrowError("Bank account not found")
  })

  it("should throw an error if the category already exists", async () => {
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const existingCategory = {
      id: categoryRepository.categories.length + 1,
      bankAccountId: existingBankAccount.id,
      name: "My Category",
    }
    categoryRepository.categories = [existingCategory]
    await expect(
      addCategoryToBankAccountUseCase.execute({
        bankAccountId: existingCategory.bankAccountId,
        name: existingCategory.name,
      })
    ).rejects.toThrowError("Category already exists")
    expect(categoryRepository.categories).toHaveLength(1)
  })

  it("should throw an error if the category name is empty", async () => {
    await expect(
      addCategoryToBankAccountUseCase.execute({
        bankAccountId: 1,
        name: "",
      })
    ).rejects.toThrowError("Category name is required")
    expect(categoryRepository.categories).toHaveLength(0)
  })

  it("should throw an error if the bank account id does not exist", async () => {
    await expect(
      addCategoryToBankAccountUseCase.execute({
        bankAccountId: 1,
        name: "My Category",
      })
    ).rejects.toThrowError("Bank account not found")
    expect(categoryRepository.categories).toHaveLength(0)
  })
})
