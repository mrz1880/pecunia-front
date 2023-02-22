import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { AddBankAccountUseCase } from "../UseCases/AddBankAccountUseCase"

describe("Add Bank Account", () => {
  let userRepository: InMemoryUserRepository
  let bankAccountRepository: InMemoryBankAccountRepository
  let bankAccountUseCase: AddBankAccountUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    bankAccountRepository = new InMemoryBankAccountRepository()
    bankAccountUseCase = new AddBankAccountUseCase(
      userRepository,
      bankAccountRepository
    )
  })

  it("should add a bank account", async () => {
    const existingUser = {
      id: userRepository.users.length + 1,
      email: "john@doe.com",
      password: "123456",
    }
    userRepository.users = [existingUser]

    const bankAccount = await bankAccountUseCase.execute({
      name: "My Bank Account",
      userId: existingUser.id,
    })

    expect(bankAccount).toHaveProperty("id")
    expect(bankAccount.name).toBe("My Bank Account")
    expect(bankAccount.userId).toBe(existingUser.id)
  })

  it("should throw an error if the user does not exist", async () => {
    await expect(
      bankAccountUseCase.execute({
        name: "My Bank Account",
        userId: 1,
      })
    ).rejects.toThrowError("User not found")
  })

  it("should throw an error if the bank account already exists", async () => {
    const existingUser = {
      id: userRepository.users.length + 1,
      email: "john@doe.com",
      password: "123456",
    }
    userRepository.users = [existingUser]

    bankAccountRepository.bankAccounts = [
      {
        id: 1,
        name: "My Bank Account",
        userId: existingUser.id,
      },
    ]

    await expect(
      bankAccountUseCase.execute({
        name: "My Bank Account",
        userId: existingUser.id,
      })
    ).rejects.toThrowError("Bank account already exists")
  })

  it("should throw an error if the bank account name is empty", async () => {
    const existingUser = {
      id: 1,
      email: "john@doe.com",
      password: "123456",
    }
    userRepository.users = [existingUser]

    await expect(
      bankAccountUseCase.execute({
        name: "",
        userId: existingUser.id,
      })
    ).rejects.toThrowError("Bank account name is required")
  })
})
