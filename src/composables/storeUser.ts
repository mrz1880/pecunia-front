import { computed, ref } from "vue"
import type { Tokens } from "@/Interfaces/User"

export const tokens = ref<Tokens>()

export const isAuthenticated = computed(() => !!tokens.value)

export function logout(): void {
  tokens.value = undefined
}
