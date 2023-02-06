import type {
  CreatedUser,
  CreateUser,
  LoginUser,
  Tokens,
} from "../../Interfaces/User"

export interface UserRepository {
  save(createUser: CreateUser): Promise<CreatedUser>

  login(loginUser: LoginUser): Promise<Tokens>
}
