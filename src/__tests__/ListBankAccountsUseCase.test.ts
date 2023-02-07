import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { ListBankAccountsUseCase } from "../UseCases/ListBankAccountsUseCase"

describe("List Bank Accounts", () => {
  it("should list all bank accounts", async () => {
    const userRepository = new InMemoryUserRepository()
    userRepository.users = [
      { id: 1, email: "john@doe.com", password: "123456" },
    ]
    const bankAccountRepository = new InMemoryBankAccountRepository()
    bankAccountRepository.bankAccounts = [
      { id: 1, name: "My Bank Account", userId: 1 },
      { id: 2, name: "My Bank Account 2", userId: 1 },
      { id: 3, name: "My Bank Account 3", userId: 1 },
    ]
    const listBankAccountsUseCase = new ListBankAccountsUseCase(
      userRepository,
      bankAccountRepository
    )
    const bankAccounts = await listBankAccountsUseCase.execute({ userId: 1 })
    expect(bankAccounts).toHaveLength(3)
  })
  it("should throw an error if the user does not exist", async () => {
    const userRepository = new InMemoryUserRepository()
    userRepository.users = []
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
