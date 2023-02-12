<template>
  <div>
    <h1>Login</h1>
    <form role="form" @submit.prevent="submitLoginForm">
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          :aria-invalid="emailError ? 'true' : 'false'"
          aria-describedby="email-error email-success"
          required
          type="email"
          @blur="validateEmail"
        />
        <span
          v-if="emailError"
          id="email-error"
          class="error-message"
          role="alert"
          >{{ emailError }}</span
        >
        <span
          v-if="emailSuccess"
          id="email-success"
          class="success-message"
          role="alert"
          >{{ emailSuccess }}</span
        >
      </div>
      <div>
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          :aria-invalid="passwordError ? 'true' : 'false'"
          aria-describedby="password-error password-success"
          required
          type="password"
          @input="validatePassword"
        />
        <span
          v-if="passwordError"
          id="password-error"
          class="error-message"
          role="alert"
          >{{ passwordError }}</span
        >
        <span
          v-if="passwordSuccess"
          id="password-success"
          class="success-message"
          role="alert"
          >{{ passwordSuccess }}</span
        >
      </div>
      <button :disabled="!isFormValid" aria-label="Register" type="submit">
        Login
      </button>
      <span v-if="submitError" class="error-message" role="alert">{{
        submitError
      }}</span>
      <span v-if="submitSuccess" class="success-message" role="status">{{
        submitSuccess
      }}</span>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { userRepository } from "@/repositories/InMemoryUserRepository"
import { LoginUserUseCase } from "@/UseCases/LoginUserUseCase"

const email = ref("")
const password = ref("")

const emailError = ref("")
const emailSuccess = ref("")
const passwordError = ref("")
const passwordSuccess = ref("")

const isFormValid = computed(
  () => !!emailSuccess.value && !!passwordSuccess.value
)

const submitError = ref("")
const submitSuccess = ref("")

function validateEmail() {
  emailError.value = ""
  if (email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    console.info("valid email")
    emailError.value = ""
    emailSuccess.value = "Email is valid"
  } else {
    console.warn("invalid email")
    emailSuccess.value = ""
    emailError.value = "Please enter a valid email"
  }
}

function validatePassword() {
  passwordError.value = ""
  if (password.value) {
    console.info("valid password")
    passwordError.value = ""
    passwordSuccess.value = "Password is accepted"
  } else {
    console.warn("invalid password")
    passwordSuccess.value = ""
    passwordError.value = "Password is required"
  }
}

async function submitLoginForm() {
  submitError.value = ""
  submitSuccess.value = ""
  validateEmail()
  validatePassword()
  if (!isFormValid.value) {
    console.error("form is invalid")
    return
  }

  const loginUserUseCase = new LoginUserUseCase(userRepository)
  try {
    console.info("logging in user...")
    const tokens = await loginUserUseCase.execute({
      email: email.value,
      password: password.value,
    })
    submitSuccess.value = "User logged in"
    email.value = ""
    password.value = ""
    console.info("logged in", tokens)
  } catch (error) {
    console.error(`${(error as Error).message}: ${email.value}`)
    submitError.value = (error as Error).message
  }
}
</script>

<style>
.error-message {
  color: #d50000;
  font-size: 12px;
}

.success-message {
  color: #4caf50;
  font-size: 12px;
}
</style>
