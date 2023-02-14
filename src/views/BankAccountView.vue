<template>
  <div>
    <h1>Add Bank Account</h1>
    <form @submit.prevent="submitAddBankAccountForm">
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          :aria-invalid="nameError ? 'true' : 'false'"
          aria-describedby="name-error name-success"
          required
          type="text"
          @input="validateName"
        />
        <span
          v-if="nameError"
          id="name-error"
          class="error-message"
          role="alert"
          >{{ nameError }}</span
        >
        <span
          v-if="nameSuccess"
          id="name-success"
          class="success-message"
          role="alert"
          >{{ nameSuccess }}</span
        >
      </div>
      <button
        :disabled="!isFormValid"
        aria-label="Add bank account"
        type="submit"
      >
        Add Bank Account
      </button>
      <span v-if="submitError" class="error-message" role="alert">{{
        submitError
      }}</span>
      <span v-if="submitSuccess" class="success-message" role="status">{{
        submitSuccess
      }}</span>
    </form>
    <h1>Bank Accounts</h1>
    <ul>
      <li v-for="bankAccount in bankAccountsList" :key="bankAccount.id">
        {{ bankAccount.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { userRepository } from "@/repositories/InMemoryUserRepository"
import { bankAccountRepository } from "@/repositories/InMemoryBankAccountRepository"
import { AddBankAccountUseCase } from "@/UseCases/AddBankAccountUseCase"
import type { BankAccount } from "@/Interfaces/BankAccount"
import { getUserIdFromToken } from "@/composables/storeUser"
import { ListBankAccountsUseCase } from "@/UseCases/ListBankAccountsUseCase"

const name = ref<BankAccount["name"]>("")
const nameError = ref("")
const nameSuccess = ref("")
const submitError = ref("")
const submitSuccess = ref("")

const bankAccountsList = ref<BankAccount[]>([])
onMounted(async () => {
  const listBankAccountUseCase = new ListBankAccountsUseCase(
    userRepository,
    bankAccountRepository
  )
  bankAccountsList.value = await listBankAccountUseCase.execute({
    userId: await getUserIdFromToken(),
  })
})
const isFormValid = computed(() => !!nameSuccess.value)

function validateName() {
  nameError.value = ""
  if (name.value.length < 3) {
    console.error("name is invalid")
    nameSuccess.value = ""
    nameError.value = "Name must be at least 3 characters"
  } else {
    console.info("name is valid")
    nameError.value = ""
    nameSuccess.value = "Name is valid"
  }
}

async function submitAddBankAccountForm() {
  console.log("submitting form")
  submitError.value = ""
  submitSuccess.value = ""

  validateName()
  if (!isFormValid.value) {
    console.error("form is invalid")
    return
  }

  const addBankAccountUseCase = new AddBankAccountUseCase(
    userRepository,
    bankAccountRepository
  )
  try {
    console.info("adding bank account")
    const userId = await getUserIdFromToken()
    const bankAccountAdded = await addBankAccountUseCase.execute({
      name: name.value,
      userId,
    })
    bankAccountsList.value.push(bankAccountAdded)
    submitSuccess.value = "Bank account added"
    name.value = ""
    console.info("bank account added", bankAccountAdded)
  } catch (error) {
    console.error(`${(error as Error).message}: ${name.value}`)
    submitError.value = (error as Error).message
  }
}
</script>

<style>
.error-message {
  color: red;
  font-size: 12px;
}

.success-message {
  color: #9ccc65;
  font-size: 12px;
}
</style>
