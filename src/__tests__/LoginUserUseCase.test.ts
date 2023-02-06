import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { LoginUserUseCase } from "@/UseCases/LoginUserUseCase"

describe("Login User Use Case", () => {
  it("should login a user", async () => {
    const userRepository = new InMemoryUserRepository()
    const existingUser = { id: 1, email: "john@doe.fr", password: "123456" }
    userRepository.users = [existingUser]
    const loginUserUseCase = new LoginUserUseCase(userRepository)
    const validUser = {
      email: existingUser.email,
      password: existingUser.password,
    }
    const tokens = await loginUserUseCase.execute(validUser)
    expect(tokens).toHaveProperty("accessToken")
    expect(tokens).toHaveProperty("refreshToken")
  })
  it("should throw an error if the user does not exist", async () => {
    const userRepository = new InMemoryUserRepository()
    const loginUserUseCase = new LoginUserUseCase(userRepository)
    const nonExistingUser = {
      email: "john@doe.com",
      password: "123456",
    }
    await expect(
      loginUserUseCase.execute(nonExistingUser)
    ).rejects.toThrowError("Invalid credentials")
  })
  it("should throw an error if the password is invalid", async () => {
    const userRepository = new InMemoryUserRepository()
    const existingUser = { id: 1, email: "john@doe.com", password: "123456" }
    userRepository.users = [existingUser]
    const loginUserUseCase = new LoginUserUseCase(userRepository)
    const userWithInvalidPassword = {
      email: existingUser.email,
      password: "7891011",
    }
    await expect(
      loginUserUseCase.execute(userWithInvalidPassword)
    ).rejects.toThrowError("Invalid credentials")
  })
})
