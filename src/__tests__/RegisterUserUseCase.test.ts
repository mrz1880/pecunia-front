import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { RegisterUserUseCase } from "../repositories/RegisterUserUseCase"

describe("Register User Use Case", () => {
  it("should register a user", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)
    const createUser = {
      email: "",
      password: "",
    }
    const createdUser = await registerUserUseCase.execute(createUser)

    expect(createdUser).toHaveProperty("id")
    expect(createdUser.email).toBe(createUser.email)
  })
})
