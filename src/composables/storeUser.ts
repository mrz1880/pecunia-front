import { computed, ref } from "vue"
import type { Tokens } from "@/Interfaces/User"
import { defaultTokenHelper } from "@/repositories/InMemoryUserRepository"
import router, { routes } from "@/router"

export const tokens = ref<Tokens>()

export const isAuthenticated = computed(
  () => !!tokens.value || localStorage.getItem("tokens")
)

export async function logout(): Promise<void> {
  tokens.value = undefined
  localStorage.removeItem("tokens")
  await router.push(routes.login.path)
}

export async function getUserIdFromToken(): Promise<number> {
  if (!tokens.value) {
    await router.push(routes.login.path)
    throw new Error("No tokens")
  }
  const { accessToken } = tokens.value
  const decodedToken = defaultTokenHelper.decodeToken(accessToken)
  return decodedToken.id
}
