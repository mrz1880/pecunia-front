export interface AddBankAccount {
  name: string
  userId: number
}

export interface AddedBankAccount extends AddBankAccount {
  id: number
}

export interface BankAccount extends AddedBankAccount {}
