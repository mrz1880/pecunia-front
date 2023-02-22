<template>
  <div>
    <h1>Register</h1>
    <form role="form" @submit.prevent="submitRegisterForm">
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          :aria-invalid="emailError ? 'true' : 'false'"
          aria-describedby="email-error email-success"
          data-test="register-email-input"
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
          data-test="register-password-input"
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
          data-test="register-passwordConfirmation-input"
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
      <button
        :disabled="!isFormValid"
        aria-label="Register"
        data-test="register-submit-button"
        type="submit"
      >
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

const isFormValid = computed(
  () =>
    !!emailSuccess.value &&
    !!passwordSuccess.value &&
    !!passwordConfirmationSuccess.value
)

const submitError = ref("")
const submitSuccess = ref("")

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = emailRegex.test(email.value)

  emailError.value = isValidEmail ? "" : "Please enter a valid email"
  emailSuccess.value = isValidEmail ? "Email is valid" : ""
}

function validatePassword() {
  const isValidPassword = password.value.length >= 6

  passwordError.value = isValidPassword
    ? ""
    : "Password must be at least 6 characters long"
  passwordSuccess.value = isValidPassword ? "Password is valid" : ""
}

function validatePasswordConfirmation() {
  const isValidPasswordConfirmation =
    passwordConfirmation.value === password.value

  passwordConfirmationError.value = isValidPasswordConfirmation
    ? ""
    : "Passwords do not match"
  passwordConfirmationSuccess.value = isValidPasswordConfirmation
    ? "Passwords match"
    : ""
}

async function submitRegisterForm() {
  submitError.value = ""
  submitSuccess.value = ""
  validateEmail()
  validatePassword()
  validatePasswordConfirmation()
  if (!isFormValid.value) {
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
