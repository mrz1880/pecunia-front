import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { InMemoryTransactionRepository } from "../repositories/InMemoryTransactionRepository"
import { AddTransactionToBankAccountUseCase } from "../UseCases/AddTransactionToBankAccountUseCase"

describe("Add Transaction to Bank Account", () => {
  it("should add a transaction to a bank account", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const existingBankAccount = {
      id: 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const transactionRepository = new InMemoryTransactionRepository()
    const addTransactionToBankAccountUseCase =
      new AddTransactionToBankAccountUseCase(
        bankAccountRepository,
        transactionRepository
      )
    const newTransaction = {
      bankAccountId: existingBankAccount.id,
      amount: 100,
      description: "My Transaction",
      date: new Date(),
    }
    const transaction = await addTransactionToBankAccountUseCase.execute(
      newTransaction
    )
    expect(transaction).toEqual({
      id: 1,
      ...newTransaction,
    })
  })
  it("should throw an error if the bank account does not exist", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const transactionRepository = new InMemoryTransactionRepository()
    const addTransactionToBankAccountUseCase =
      new AddTransactionToBankAccountUseCase(
        bankAccountRepository,
        transactionRepository
      )
    await expect(
      addTransactionToBankAccountUseCase.execute({
        bankAccountId: 1,
        amount: 100,
        description: "My Transaction",
        date: new Date(),
      })
    ).rejects.toThrowError("Bank account not found")
    expect(transactionRepository.transactions).toHaveLength(0)
  })
  it("should throw an error if the transaction description is empty", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const existingBankAccount = {
      id: 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const transactionRepository = new InMemoryTransactionRepository()
    const addTransactionToBankAccountUseCase =
      new AddTransactionToBankAccountUseCase(
        bankAccountRepository,
        transactionRepository
      )
    await expect(
      addTransactionToBankAccountUseCase.execute({
        bankAccountId: existingBankAccount.id,
        amount: 100,
        description: "",
        date: new Date(),
      })
    ).rejects.toThrowError("Transaction description is required")
    expect(transactionRepository.transactions).toHaveLength(0)
  })
  it("should throw an error if the transaction amount is zero", async () => {
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const existingBankAccount = {
      id: 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]
    const transactionRepository = new InMemoryTransactionRepository()
    const addTransactionToBankAccountUseCase =
      new AddTransactionToBankAccountUseCase(
        bankAccountRepository,
        transactionRepository
      )
    await expect(
      addTransactionToBankAccountUseCase.execute({
        bankAccountId: existingBankAccount.id,
        amount: 0,
        description: "My Transaction",
        date: new Date(),
      })
    ).rejects.toThrowError("Transaction amount cannot be zero")
    expect(transactionRepository.transactions).toHaveLength(0)
  })
})
