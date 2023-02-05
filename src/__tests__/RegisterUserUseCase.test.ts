import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { RegisterUserUseCase } from "../repositories/RegisterUserUseCase"

describe("Register User Use Case", () => {
  it("should register a user", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)
    const createUser = {
      email: "john@doe.com",
      password: "",
    }
    const createdUser = await registerUserUseCase.execute(createUser)

    expect(createdUser).toHaveProperty("id")
    expect(createdUser.email).toBe(createUser.email)
  })
  it("should not register a user with an invalid email", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)
    const createUser = {
      email: "invalid-email",
      password: "",
    }
    try {
      const createdUser = await registerUserUseCase.execute(createUser)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toBe("Invalid email")
    }
  })
})
