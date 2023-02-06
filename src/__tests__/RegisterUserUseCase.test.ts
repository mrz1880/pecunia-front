import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository"
import { RegisterUserUseCase } from "../UseCases/RegisterUserUseCase"
import { expect } from "vitest"

describe("Register User Use Case", () => {
  it("should register a user", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)
    const validUser = {
      email: "john@doe.com",
      password: "123456",
    }
    const createdUser = await registerUserUseCase.execute(validUser)

    expect(createdUser).toHaveProperty("id")
    expect(createdUser.email).toBe(validUser.email)
    expect(userRepository.users).toHaveLength(1)
  })
  it("should not register a user with an invalid email", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)
    const userWithInvalidEmail = {
      email: "invalid-email",
      password: "valid-password",
    }
    try {
      await registerUserUseCase.execute(userWithInvalidEmail)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toBe("Invalid email")
    }
    expect(userRepository.users).toHaveLength(0)
  })
  it("should not register a user with an invalid password", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)
    const userWithInvalidPassword = {
      email: "john@doe.com",
      password: "123",
    }
    try {
      await registerUserUseCase.execute(userWithInvalidPassword)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toBe("Invalid password")
    }
    expect(userRepository.users).toHaveLength(0)
  })
  it("should not register a user with an already registered email", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)
    const validUser = {
      email: "john@doe.com",
      password: "123456",
    }
    await registerUserUseCase.execute(validUser)
    try {
      await registerUserUseCase.execute(validUser)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toBe("Email already registered")
    }
    expect(userRepository.users).toHaveLength(1)
  })
})
