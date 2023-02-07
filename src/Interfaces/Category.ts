export interface AddCategoryToBankAccount {
  bankAccountId: number
  name: string
}

export interface AddedCategoryToBankAccount extends AddCategoryToBankAccount {
  id: number
}

export interface Category extends AddedCategoryToBankAccount {}
