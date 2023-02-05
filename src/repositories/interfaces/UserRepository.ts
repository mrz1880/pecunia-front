import type { CreatedUser, CreateUser } from "../../Interfaces/User"

export interface UserRepository {
  save(createUser: CreateUser): CreatedUser
}
