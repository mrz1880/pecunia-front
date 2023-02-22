import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { ListBankAccountsUseCase } from "../UseCases/ListBankAccountsUseCase"

describe("ListBankAccountsUseCase", () => {
  let userRepository: InMemoryUserRepository
  let bankAccountRepository: InMemoryBankAccountRepository
  let listBankAccountsUseCase: ListBankAccountsUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    bankAccountRepository = new InMemoryBankAccountRepository()
    listBankAccountsUseCase = new ListBankAccountsUseCase(
      userRepository,
      bankAccountRepository
    )
  })

  it("should list all bank accounts for a user", async () => {
    // Arrange
    const existingUser = {
      id: userRepository.users.length + 1,
      email: "john@doe.com",
      password: "123456",
    }
    userRepository.users = [existingUser]

    bankAccountRepository.bankAccounts = [
      { id: 1, name: "My Bank Account", userId: existingUser.id },
      { id: 2, name: "My Bank Account 2", userId: existingUser.id },
      { id: 3, name: "My Bank Account 3", userId: existingUser.id },
    ]

    // Act
    const bankAccounts = await listBankAccountsUseCase.execute({
      userId: existingUser.id,
    })

    // Assert
    expect(bankAccounts).toHaveLength(3)
  })

  it("should throw an error if the user does not exist", async () => {
    // Arrange
    const nonExistingUserId = 1

    // Act & Assert
    await expect(
      listBankAccountsUseCase.execute({ userId: nonExistingUserId })
    ).rejects.toThrowError("User not found")
  })
})
