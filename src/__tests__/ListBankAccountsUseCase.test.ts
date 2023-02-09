import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { ListBankAccountsUseCase } from "../UseCases/ListBankAccountsUseCase"

describe("List Bank Accounts", () => {
  it("should list all bank accounts", async () => {
    const userRepository = new InMemoryUserRepository()
    const existingUser = {
      id: userRepository.users.length,
      email: "john@doe.com",
      password: "123456",
    }
    userRepository.users = [existingUser]
    const bankAccountRepository = new InMemoryBankAccountRepository()
    bankAccountRepository.bankAccounts = [
      { id: 1, name: "My Bank Account", userId: existingUser.id },
      { id: 2, name: "My Bank Account 2", userId: existingUser.id },
      { id: 3, name: "My Bank Account 3", userId: existingUser.id },
      { id: 4, name: "My Bank Account 4", userId: 2 },
    ]
    const listBankAccountsUseCase = new ListBankAccountsUseCase(
      userRepository,
      bankAccountRepository
    )
    const bankAccounts = await listBankAccountsUseCase.execute({
      userId: existingUser.id,
    })
    expect(bankAccounts).toHaveLength(3)
  })
  it("should throw an error if the user does not exist", async () => {
    const userRepository = new InMemoryUserRepository()
    const bankAccountRepository = new InMemoryBankAccountRepository()
    const listBankAccountsUseCase = new ListBankAccountsUseCase(
      userRepository,
      bankAccountRepository
    )
    await expect(
      listBankAccountsUseCase.execute({ userId: 1 })
    ).rejects.toThrowError("User not found")
  })
})
