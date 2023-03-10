import { InMemoryBankAccountRepository } from "../repositories/InMemoryBankAccountRepository"
import { InMemoryCategoryRepository } from "../repositories/InMemoryCategoryRepository"
import { ListBankAccountCategoriesUseCase } from "../UseCases/ListBankAccountCategoriesUseCase"

describe("List Bank Account Categories", () => {
  let bankAccountRepository: InMemoryBankAccountRepository
  let categoryRepository: InMemoryCategoryRepository
  let listBankAccountCategoriesUseCase: ListBankAccountCategoriesUseCase

  beforeEach(() => {
    bankAccountRepository = new InMemoryBankAccountRepository()
    categoryRepository = new InMemoryCategoryRepository()
    listBankAccountCategoriesUseCase = new ListBankAccountCategoriesUseCase(
      bankAccountRepository,
      categoryRepository
    )
  })
  it("should list all categories of a bank account", async () => {
    const existingBankAccount = {
      id: bankAccountRepository.bankAccounts.length + 1,
      userId: 1,
      name: "My Bank Account",
    }
    bankAccountRepository.bankAccounts = [existingBankAccount]

    categoryRepository.categories = [
      {
        id: 1,
        bankAccountId: existingBankAccount.id,
        name: "My Category",
      },
      {
        id: 2,
        bankAccountId: 2,
        name: "Not my Category because it belongs to another bank account",
      },
    ]

    const categories = await listBankAccountCategoriesUseCase.execute({
      bankAccountId: existingBankAccount.id,
    })
    expect(categories.length).toBe(1)
    expect(categories[0].name).toBe("My Category")
  })
  it("should throw an error if the bank account does not exist", async () => {
    await expect(
      listBankAccountCategoriesUseCase.execute({ bankAccountId: 1 })
    ).rejects.toThrowError("Bank account not found")
  })
})
