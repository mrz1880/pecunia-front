export interface AddTransactionToBankAccount {
  date: Date
  amount: number
  bankAccountId: number
  description: string
}

export interface AddedTransactionToBankAccount
  extends AddTransactionToBankAccount {
  id: number
}

export interface Transaction extends AddedTransactionToBankAccount {}
