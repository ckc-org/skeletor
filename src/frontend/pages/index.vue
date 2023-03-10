<template>
  <div>
    <div v-if="authStore.user !== null">
      You are logged in as {{ authStore.user.email }}

      <v-btn
        @click="authStore.logout()"
        outlined
      >
        Sign Out
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>

    You are not logged in yet.

    <v-btn
      to="/login"
      outlined
    >
      Login
      <v-icon>mdi-login</v-icon>
    </v-btn>

  </div>
</template>

<script setup>
import { useUserAuth } from "~/store/user"

const authStore = useUserAuth()
</script>
