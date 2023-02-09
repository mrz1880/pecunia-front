export interface AddReccurentTransactionToBankAccount {
  name: string
  amount: number
  frequency: string // daily, weekly, monthly, yearly
  nextDueDate: Date
  startDate: Date
  endDate?: Date
  bankAccountId: number
  categoryId: number
}

export interface AddedReccurentTransactionToBankAccount
  extends AddReccurentTransactionToBankAccount {
  id: number
}

export interface RecurrentTransaction
  extends AddedReccurentTransactionToBankAccount {}
