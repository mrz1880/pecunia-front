import type { CreateUser } from "../../Interfaces/User"

export interface UserRepository {
  save(createUser: CreateUser): { id: number; email: string }
}
