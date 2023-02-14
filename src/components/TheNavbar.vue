<template>
  <nav aria-label="Main Navigation">
    <ul>
      <li :aria-current="isCurrentRoute(routes.home.path)">
        <router-link :to="routes.home.path">Home</router-link>
      </li>
      <li
        v-if="isAuthenticated"
        :aria-current="isCurrentRoute(routes.bankAccount.path)"
      >
        <router-link
          :to="routes.bankAccount.path"
          data-test="navbar-bankAccount-link"
          >Bank Accounts</router-link
        >
      </li>

      <li
        v-if="!isAuthenticated"
        :aria-current="isCurrentRoute(routes.login.path)"
      >
        <router-link :to="routes.login.path">Login</router-link>
      </li>
      <li
        v-if="!isAuthenticated"
        :aria-current="isCurrentRoute(routes.register.path)"
      >
        <router-link :to="routes.register.path">Register</router-link>
      </li>
      <li v-if="isAuthenticated">
        <a href="#" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { isAuthenticated, logout } from "@/composables/storeUser"
import { useRoute } from "vue-router"
import { ref } from "vue"
import { routes } from "@/router"

const currentRoute = useRoute().path
const showDropDown = ref(false)

function isCurrentRoute(route: string): "page" | boolean {
  return currentRoute === route ? "page" : false
}
</script>
