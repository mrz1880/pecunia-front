import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { AddRecurrentTransactionToBankAccountUseCase } from "../UseCases/AddRecurrentTransactionToBankAccountUseCase"
import { InMemoryRecurrentTransactionRepository } from "../repositories/InMemoryRecurrentTransactionRepository"
import { InMemoryCategoryRepository } from "../repositories/InMemoryCategoryRepository"

describe("Add Recurrent Transaction to Bank Account", () => {
  it("should add a recurrent transaction to a bank account", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const recurrentTransactionRepository =
      new InMemoryRecurrentTransactionRepository()
    const categoryRepository = new InMemoryCategoryRepository()
    const existingCategory = {
      id: categoryRepository.categories.length + 1,
      userId: 1,
      name: "My Category",
      bankAccountId: existingBankAccount.id,
    }
    categoryRepository.categories = [existingCategory]
    const addRecurrentTransactionToBankAccountUseCase =
      new AddRecurrentTransactionToBankAccountUseCase(
        bankAccountRepository,
        recurrentTransactionRepository,
        categoryRepository
      )
    const newReccurentTransaction = {
      name: "My Recurrent Transaction",
      amount: 100,
      frequency: "monthly",
      nextDueDate: new Date(),
      startDate: new Date(),
      bankAccountId: existingBankAccount.id,
      categoryId: existingCategory.id,
    }
    const addedReccurentTransactionToBankAccount =
      await addRecurrentTransactionToBankAccountUseCase.execute(
        newReccurentTransaction
      )
    expect(addedReccurentTransactionToBankAccount).toEqual({
      id: recurrentTransactionRepository.recurrentTransactions.length,
      ...newReccurentTransaction,
    })
  })
  it("should throw an error if the bank account does not exist", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()

    const recurrentTransactionRepository =
      new InMemoryRecurrentTransactionRepository()
    const categoryRepository = new InMemoryCategoryRepository()
    const addRecurrentTransactionToBankAccountUseCase =
      new AddRecurrentTransactionToBankAccountUseCase(
        bankAccountRepository,
        recurrentTransactionRepository,
        categoryRepository
      )
    await expect(
      addRecurrentTransactionToBankAccountUseCase.execute({
        name: "My Recurrent Transaction",
        amount: 100,
        frequency: "monthly",
        nextDueDate: new Date(),
        startDate: new Date(),
        bankAccountId: 1,
        categoryId: 1,
      })
    ).rejects.toThrowError("Bank account not found")
    expect(recurrentTransactionRepository.recurrentTransactions).toHaveLength(0)
  })
  it("should throw an error if the transaction description is empty", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const recurrentTransactionRepository =
      new InMemoryRecurrentTransactionRepository()
    const categoryRepository = new InMemoryCategoryRepository()
    const existingCategory = {
      id: categoryRepository.categories.length + 1,
      userId: 1,
      name: "My Category",
      bankAccountId: existingBankAccount.id,
    }
    categoryRepository.categories = [existingCategory]
    const addRecurrentTransactionToBankAccountUseCase =
      new AddRecurrentTransactionToBankAccountUseCase(
        bankAccountRepository,
        recurrentTransactionRepository,
        categoryRepository
      )
    await expect(
      addRecurrentTransactionToBankAccountUseCase.execute({
        name: "",
        amount: 100,
        frequency: "monthly",
        nextDueDate: new Date(),
        startDate: new Date(),
        bankAccountId: existingBankAccount.id,
        categoryId: existingCategory.id,
      })
    ).rejects.toThrowError("Recurrent transaction name is required")
    expect(recurrentTransactionRepository.recurrentTransactions).toHaveLength(0)
  })
  it("should throw an error if the transaction amount is zero", async () => {
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
      userId: 1,
      name: "My Category",
      bankAccountId: existingBankAccount.id,
    }
    categoryRepository.categories = [existingCategory]
    const recurrentTransactionRepository =
      new InMemoryRecurrentTransactionRepository()
    const addRecurrentTransactionToBankAccountUseCase =
      new AddRecurrentTransactionToBankAccountUseCase(
        bankAccountRepository,
        recurrentTransactionRepository,
        categoryRepository
      )
    await expect(
      addRecurrentTransactionToBankAccountUseCase.execute({
        name: "My Recurrent Transaction",
        amount: 0,
        frequency: "monthly",
        nextDueDate: new Date(),
        startDate: new Date(),
        bankAccountId: existingBankAccount.id,
        categoryId: existingCategory.id,
      })
    ).rejects.toThrowError("Recurrent transaction amount cannot be zero")
    expect(recurrentTransactionRepository.recurrentTransactions).toHaveLength(0)
  })
})
