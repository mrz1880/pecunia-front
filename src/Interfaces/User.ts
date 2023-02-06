export interface CreateUser {
  email: string
  password: string
}

export type CreatedUser = Omit<CreateUser, "password"> & {
  id: number
}
