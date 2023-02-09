import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { AddBankAccountUseCase } from "../UseCases/AddBankAccountUseCase"

describe("Add Bank Account", () => {
  it("should add a bank account", async () => {
    const userRepository = new InMemoryUserRepository()
    const existingUser = {
      id: userRepository.users.length + 1,
      email: "john@doe.com",
      password: "123456",
    }
    userRepository.users = [existingUser]
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const bankAccountUseCase = new AddBankAccountUseCase(
      userRepository,
      bankAccountRepository
    )
    const bankAccount = await bankAccountUseCase.execute({
      name: "My Bank Account",
      userId: existingUser.id,
    })
    expect(bankAccount).toHaveProperty("id")
    expect(bankAccount.name).toBe("My Bank Account")
    expect(bankAccount.userId).toBe(existingUser.id)
  })
  it("should throw an error if the user does not exist", async () => {
    const userRepository = new InMemoryUserRepository()
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
    const existingUser = {
      id: userRepository.users.length + 1,
      email: "john@doe.com",
      password: "123456",
    }
    userRepository.users = [existingUser]
    const bankAccountRepository = new InMemoryBankAccountRepository()
    bankAccountRepository.bankAccounts = [
      {
        id: bankAccountRepository.bankAccounts.length + 1,
        name: "My Bank Account",
        userId: existingUser.id,
      },
    ]
    const bankAccountUseCase = new AddBankAccountUseCase(
      userRepository,
      bankAccountRepository
    )
    await expect(
      bankAccountUseCase.execute({
        name: "My Bank Account",
        userId: existingUser.id,
      })
    ).rejects.toThrowError("Bank account already exists")
  })
  it("should throw an error if the bank account name is empty", async () => {
    const userRepository = new InMemoryUserRepository()
    const existingUser = { id: 1, email: "john@doe.com", password: "123456" }
    userRepository.users = [existingUser]
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const bankAccountUseCase = new AddBankAccountUseCase(
      userRepository,
      bankAccountRepository
    )
    await expect(
      bankAccountUseCase.execute({
        name: "",
        userId: existingUser.id,
      })
    ).rejects.toThrowError("Bank account name is required")
  })
})
