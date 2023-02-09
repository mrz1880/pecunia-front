import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { expect } from "vitest"
import { InMemoryCategoryRepository } from "../repositories/InMemoryCategoryRepository"
import { AddCategoryToBankAccountUseCase } from "../UseCases/AddCategoryToBankAccountUseCase"

describe("Add Category To Bank Account", () => {
  it("should add a category to a bank account", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const categoryRepository = new InMemoryCategoryRepository()
    const addCategoryToBankAccountUseCase = new AddCategoryToBankAccountUseCase(
      bankAccountRepository,
      categoryRepository
    )
    const addedCategory = await addCategoryToBankAccountUseCase.execute({
      bankAccountId: existingBankAccount.id,
      name: "My Category",
    })
    expect(addedCategory).toHaveProperty("id")
    expect(addedCategory.name).toBe("My Category")
    expect(addedCategory.bankAccountId).toBe(1)
  })
  it("should throw an error if the bank account does not exist", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const categoryRepository = new InMemoryCategoryRepository()
    const addCategoryToBankAccountUseCase = new AddCategoryToBankAccountUseCase(
      bankAccountRepository,
      categoryRepository
    )
    await expect(
      addCategoryToBankAccountUseCase.execute({
        bankAccountId: 1,
        name: "My Category",
      })
    ).rejects.toThrowError("Bank account not found")
  })
  it("should throw an error if the category already exists", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const categoryRepository = new InMemoryCategoryRepository()
    const existingCategory = {
      id: categoryRepository.categories.length + 1,
      bankAccountId: existingBankAccount.id,
      name: "My Category",
    }
    categoryRepository.categories = [existingCategory]
    const addCategoryToBankAccountUseCase = new AddCategoryToBankAccountUseCase(
      bankAccountRepository,
      categoryRepository
    )
    await expect(
      addCategoryToBankAccountUseCase.execute({
        bankAccountId: existingCategory.bankAccountId,
        name: existingCategory.name,
      })
    ).rejects.toThrowError("Category already exists")

    expect(categoryRepository.categories).toHaveLength(1)
  })
  it("should throw an error if the category name is empty", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const categoryRepository = new InMemoryCategoryRepository()

    const addCategoryToBankAccountUseCase = new AddCategoryToBankAccountUseCase(
      bankAccountRepository,
      categoryRepository
    )
    await expect(
      addCategoryToBankAccountUseCase.execute({
        bankAccountId: 1,
        name: "",
      })
    ).rejects.toThrowError("Category name is required")
    expect(categoryRepository.categories).toHaveLength(0)
  })
  it("should throw an error if the bank account id is empty", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const categoryRepository = new InMemoryCategoryRepository()

    const addCategoryToBankAccountUseCase = new AddCategoryToBankAccountUseCase(
      bankAccountRepository,
      categoryRepository
    )
    await expect(
      addCategoryToBankAccountUseCase.execute({
        bankAccountId: 0,
        name: "My Category",
      })
    ).rejects.toThrowError("Bank account not found")
    expect(categoryRepository.categories).toHaveLength(0)
  })
  it("should throw an error if the bank account id does not exist", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const categoryRepository = new InMemoryCategoryRepository()

    const addCategoryToBankAccountUseCase = new AddCategoryToBankAccountUseCase(
      bankAccountRepository,
      categoryRepository
    )
    await expect(
      addCategoryToBankAccountUseCase.execute({
        bankAccountId: 1,
        name: "My Category",
      })
    ).rejects.toThrowError("Bank account not found")
    expect(categoryRepository.categories).toHaveLength(0)
  })
})
