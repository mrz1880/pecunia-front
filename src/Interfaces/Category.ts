export interface AddCategoryToBankAccount {
  bankAccountId: number
  name: string
}

export interface AddedCategoryToBankAccount extends AddCategoryToBankAccount {
  id: number
}

export interface Categories extends AddedCategoryToBankAccount {}
