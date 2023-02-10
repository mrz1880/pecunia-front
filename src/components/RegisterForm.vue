<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" @blur="validateEmail" />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      <div>
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          @blur="validatePassword"
        />
        <span v-if="passwordError" class="error-message">{{
          passwordError
        }}</span>
      </div>
      <div>
        <label for="passwordConfirmation">Password Confirmation</label>
        <input
          id="passwordConfirmation"
          v-model="passwordConfirmation"
          type="password"
          @blur="validatePasswordConfirmation"
        />
        <span v-if="passwordConfirmationError" class="error-message">{{
          passwordConfirmationError
        }}</span>
      </div>
      <button type="submit">Register</button>
      <span v-if="submitError" class="error-message">{{ submitError }}</span>
      <span v-if="submitSuccess" class="success-message">{{
        submitSuccess
      }}</span>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { RegisterUserUseCase } from "@/UseCases/RegisterUserUseCase"
import { userRepository } from "@/repositories/InMemoryUserRepository"

const email = ref("")
const password = ref("")
const passwordConfirmation = ref("")

const emailError = ref("")
const passwordError = ref("")
const passwordConfirmationError = ref("")

const submitError = ref("")
const submitSuccess = ref("")

function validateEmail() {
  emailError.value = ""
  if (email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    console.info("valid email")
    emailError.value = ""
  } else {
    console.warn("invalid email")
    emailError.value = "Please enter a valid email"
  }
}

function validatePassword() {
  passwordError.value = ""
  if (password.value.length < 6) {
    console.warn("invalid password")
    passwordError.value = "Password must be at least 6 characters"
  } else {
    console.info("valid password")
    passwordError.value = ""
  }
}

function validatePasswordConfirmation() {
  if (passwordError.value) {
    return
  }
  passwordConfirmationError.value = ""
  if (passwordConfirmation.value !== password.value) {
    console.warn("passwords do not match")
    passwordConfirmationError.value = "Passwords do not match"
  } else {
    console.info("passwords match")
    passwordConfirmationError.value = ""
  }
}

async function register() {
  submitError.value = ""
  submitSuccess.value = ""
  validateEmail()
  validatePassword()
  validatePasswordConfirmation()
  const isFormInvalid =
    emailError.value || passwordError.value || passwordConfirmationError.value
  if (isFormInvalid) {
    console.error("form is invalid")
    return
  }

  const registerUserUseCase = new RegisterUserUseCase(userRepository)
  try {
    console.info("registering")
    const userCreated = await registerUserUseCase.execute({
      email: email.value,
      password: password.value,
    })
    submitSuccess.value = "User created"
    email.value = ""
    password.value = ""
    passwordConfirmation.value = ""
    console.info("registered", userCreated)
  } catch (error) {
    console.error(`${(error as Error).message}: ${email.value}`)
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
