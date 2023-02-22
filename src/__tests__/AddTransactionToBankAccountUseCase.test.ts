import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { InMemoryTransactionRepository } from "../repositories/InMemoryTransactionRepository"
import { AddTransactionToBankAccountUseCase } from "../UseCases/AddTransactionToBankAccountUseCase"
import { InMemoryCategoryRepository } from "../repositories/InMemoryCategoryRepository"

describe("Add Transaction to Bank Account", () => {
  let bankAccountRepository: InMemoryBankAccountRepository
  let transactionRepository: InMemoryTransactionRepository
  let categoryRepository: InMemoryCategoryRepository
  let addTransactionToBankAccountUseCase: AddTransactionToBankAccountUseCase

  beforeEach(() => {
    bankAccountRepository = new InMemoryBankAccountRepository()
    transactionRepository = new InMemoryTransactionRepository()
    categoryRepository = new InMemoryCategoryRepository()
    addTransactionToBankAccountUseCase = new AddTransactionToBankAccountUseCase(
      bankAccountRepository,
      transactionRepository,
      categoryRepository
    )
  })
  it("should add a transaction to a bank account", async () => {
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const existingCategory = {
      id: categoryRepository.categories.length + 1,
      name: "My Category",
      bankAccountId: existingBankAccount.id,
    }
    categoryRepository.categories = [existingCategory]

    const newTransaction = {
      bankAccountId: existingBankAccount.id,
      amount: 100,
      description: "My Transaction",
      date: new Date(),
      categoryId: existingCategory.id,
    }
    const transaction = await addTransactionToBankAccountUseCase.execute(
      newTransaction
    )
    expect(transaction).toEqual({
      id: transactionRepository.transactions.length,
      ...newTransaction,
    })
  })
  it("should throw an error if the bank account does not exist", async () => {
    const existingCategory = {
      id: categoryRepository.categories.length + 1,
      name: "My Category",
      bankAccountId: 1,
    }

    await expect(
      addTransactionToBankAccountUseCase.execute({
        bankAccountId: 1,
        amount: 100,
        description: "My Transaction",
        date: new Date(),
        categoryId: existingCategory.id,
      })
    ).rejects.toThrowError("Bank account not found")
    expect(transactionRepository.transactions).toHaveLength(0)
  })
  it("should throw an error if the transaction description is empty", async () => {
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const existingCategory = {
      id: categoryRepository.categories.length + 1,
      name: "My Category",
      bankAccountId: existingBankAccount.id,
    }

    await expect(
      addTransactionToBankAccountUseCase.execute({
        bankAccountId: existingBankAccount.id,
        amount: 100,
        description: "",
        date: new Date(),
        categoryId: existingCategory.id,
      })
    ).rejects.toThrowError("Transaction description is required")
    expect(transactionRepository.transactions).toHaveLength(0)
  })
  it("should throw an error if the transaction amount is zero", async () => {
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const existingCategory = {
      id: categoryRepository.categories.length + 1,
      name: "My Category",
      bankAccountId: existingBankAccount.id,
    }

    await expect(
      addTransactionToBankAccountUseCase.execute({
        bankAccountId: existingBankAccount.id,
        amount: 0,
        description: "My Transaction",
        date: new Date(),
        categoryId: existingCategory.id,
      })
    ).rejects.toThrowError("Transaction amount cannot be zero")
    expect(transactionRepository.transactions).toHaveLength(0)
  })
  it("should throw an error if the transaction category does not exist", async () => {
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]

    await expect(
      addTransactionToBankAccountUseCase.execute({
        bankAccountId: existingBankAccount.id,
        amount: 100,
        description: "My Transaction",
        date: new Date(),
        categoryId: 1,
      })
    ).rejects.toThrowError("Category not found")
    expect(transactionRepository.transactions).toHaveLength(0)
  })
  it("should throw an error if the transaction category does not belong to the bank account", async () => {
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const existingCategory = {
      id: categoryRepository.categories.length + 1,
      name: "My Category",
      bankAccountId: 2,
    }
    categoryRepository.categories = [existingCategory]

    await expect(
      addTransactionToBankAccountUseCase.execute({
        bankAccountId: existingBankAccount.id,
        amount: 100,
        description: "My Transaction",
        date: new Date(),
        categoryId: existingCategory.id,
      })
    ).rejects.toThrowError("Category not found")
    expect(transactionRepository.transactions).toHaveLength(0)
  })
})
