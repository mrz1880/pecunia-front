import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { LoginUserUseCase } from "@/UseCases/LoginUserUseCase"

describe("Login User Use Case", () => {
  let userRepository: InMemoryUserRepository
  let loginUserUseCase: LoginUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    loginUserUseCase = new LoginUserUseCase(userRepository)
  })

  it("should login a user", async () => {
    const existingUser = { id: 1, email: "john@doe.fr", password: "123456" }
    userRepository.users = [existingUser]

    const validUser = {
      email: existingUser.email,
      password: existingUser.password,
    }
    const tokens = await loginUserUseCase.execute(validUser)
    expect(tokens).toHaveProperty("accessToken")
    expect(tokens).toHaveProperty("refreshToken")
  })
  it("should throw an error if the user does not exist", async () => {
    const nonExistingUser = {
      email: "john@doe.com",
      password: "123456",
    }
    await expect(
      loginUserUseCase.execute(nonExistingUser)
    ).rejects.toThrowError("Invalid credentials")
  })
  it("should throw an error if the password is invalid", async () => {
    const existingUser = { id: 1, email: "john@doe.com", password: "123456" }
    userRepository.users = [existingUser]

    const userWithInvalidPassword = {
      email: existingUser.email,
      password: "7891011",
    }
    await expect(
      loginUserUseCase.execute(userWithInvalidPassword)
    ).rejects.toThrowError("Invalid credentials")
  })
})
