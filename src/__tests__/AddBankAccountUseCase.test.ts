import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { AddBankAccountUseCase } from "../UseCases/AddBankAccountUseCase"

describe("Add Bank Account", () => {
  it("should add a bank account", async () => {
    const userRepository = new InMemoryUserRepository()
    userRepository.users = [
      { id: 1, email: "john@doe.com", password: "123456" },
    ]
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const bankAccountUseCase = new AddBankAccountUseCase(
      userRepository,
      bankAccountRepository
    )
    const bankAccount = await bankAccountUseCase.execute({
      name: "My Bank Account",
      userId: 1,
    })
    expect(bankAccount).toHaveProperty("id")
    expect(bankAccount.name).toBe("My Bank Account")
    expect(bankAccount.userId).toBe(1)
  })
  it("should throw an error if the user does not exist", async () => {
    const userRepository = new InMemoryUserRepository()
    userRepository.users = []
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const bankAccountUseCase = new AddBankAccountUseCase(
      userRepository,
      bankAccountRepository
    )
    await expect(
      bankAccountUseCase.execute({
        name: "My Bank Account",
        userId: 1,
      })
    ).rejects.toThrowError("User not found")
  })
  it("should throw an error if the bank account already exists", async () => {
    const userRepository = new InMemoryUserRepository()
    userRepository.users = [
      { id: 1, email: "john@doe.com", password: "123456" },
    ]
    const bankAccountRepository = new InMemoryBankAccountRepository()
    bankAccountRepository.bankAccounts = [
      { id: 1, name: "My Bank Account", userId: 1 },
    ]
    const bankAccountUseCase = new AddBankAccountUseCase(
      userRepository,
      bankAccountRepository
    )
    await expect(
      bankAccountUseCase.execute({
        name: "My Bank Account",
        userId: 1,
      })
    ).rejects.toThrowError("Bank account already exists")
  })
  it("should throw an error if the bank account name is empty", async () => {
    const userRepository = new InMemoryUserRepository()
    userRepository.users = [
      { id: 1, email: "john@doe.com", password: "123456" },
    ]
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const bankAccountUseCase = new AddBankAccountUseCase(
      userRepository,
      bankAccountRepository
    )
    await expect(
      bankAccountUseCase.execute({
        name: "",
        userId: 1,
      })
    ).rejects.toThrowError("Bank account name is required")
  })
})
