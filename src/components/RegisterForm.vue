<template>
  <div>
    <h1>Register</h1>
    <form role="form" @submit.prevent="register">
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
          @blur="validatePassword"
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
      <div>
        <label for="passwordConfirmation">Password Confirmation</label>
        <input
          id="passwordConfirmation"
          v-model="passwordConfirmation"
          :aria-invalid="passwordConfirmationError ? 'true' : 'false'"
          aria-describedby="passwordConfirmation-error passwordConfirmation-success"
          required
          type="password"
          @input="validatePasswordConfirmation"
        />
        <span
          v-if="passwordConfirmationError"
          id="passwordConfirmation-error"
          class="error-message"
          role="alert"
          >{{ passwordConfirmationError }}</span
        >
        <span
          v-if="passwordConfirmationSuccess"
          id="passwordConfirmation-success"
          class="success-message"
          role="alert"
          >{{ passwordConfirmationSuccess }}</span
        >
      </div>
      <button :disabled="disabled" aria-label="Register" type="submit">
        Register
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
import { RegisterUserUseCase } from "@/UseCases/RegisterUserUseCase"
import { userRepository } from "@/repositories/InMemoryUserRepository"

const email = ref("")
const password = ref("")
const passwordConfirmation = ref("")

const emailError = ref("")
const emailSuccess = ref("")
const passwordError = ref("")
const passwordSuccess = ref("")
const passwordConfirmationError = ref("")
const passwordConfirmationSuccess = ref("")

const disabled = computed(
  () =>
    !(
      !!emailSuccess.value &&
      !!passwordSuccess.value &&
      !!passwordConfirmationSuccess.value
    )
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
    passwordSuccess.value = "Password is valid"
  }
}

function validatePasswordConfirmation() {
  passwordConfirmationError.value = ""
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
    passwordConfirmationSuccess.value = "Passwords match"
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
  color: #d50000;
  font-size: 12px;
}

.success-message {
  color: #4caf50;
  font-size: 12px;
}
</style>
