import type {
  CreatedUser,
  CreateUser,
  LoginUser,
  Tokens,
  User,
} from "../../Interfaces/User"

export interface UserRepository {
  save(createUser: CreateUser): Promise<CreatedUser>

  login(loginUser: LoginUser): Promise<Tokens>

  findById(userId: User["id"]): Promise<User>
}
