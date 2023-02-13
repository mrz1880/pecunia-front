<template>
  <nav aria-label="Main Navigation">
    <ul>
      <li>
        <router-link aria-current="page" to="/">Home</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link>
      </li>
      <li v-if="isAuthenticated">
        <button type="button" @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { isAuthenticated, logout } from "@/composables/storeUser"
</script>
