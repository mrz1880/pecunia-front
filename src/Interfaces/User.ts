export interface CreateUser {
  email: string
  password: string
}

export type CreatedUser = Omit<CreateUser, "password"> & {
  id: number
}

export interface LoginUser extends CreateUser {}

export interface Tokens {
  accessToken: string
  refreshToken: string
}
