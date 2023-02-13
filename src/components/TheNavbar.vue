<template>
  <nav aria-label="Main Navigation">
    <ul>
      <li v-bind:aria-current="isCurrentRoute(routes.home.path)">
        <router-link :to="routes.home.path">Home</router-link>
      </li>
      <li
        v-if="!isAuthenticated"
        v-bind:aria-current="isCurrentRoute(routes.login.path)"
      >
        <router-link :to="routes.login.path">Login</router-link>
      </li>
      <li
        v-if="!isAuthenticated"
        v-bind:aria-current="isCurrentRoute(routes.register.path)"
      >
        <router-link :to="routes.register.path">Register</router-link>
      </li>
      <li v-if="isAuthenticated">
        <button type="button" @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { isAuthenticated, logout } from "@/composables/storeUser"
import { useRoute } from "vue-router"
import { routes } from "@/router/routes"

const currentRoute = useRoute().path

function isCurrentRoute(route: string): "page" | null {
  return currentRoute === route ? "page" : null
}
</script>
