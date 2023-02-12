<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link>
      </li>
      <li v-if="isAuthenticated">
        <a href="#" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { isAuthenticated, logout } from "@/composables/storeUser"
</script>
