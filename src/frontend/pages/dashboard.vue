<template>
  <v-container>
    <div>
      <v-row class="d-flex">
        <v-col cols="8">
          <v-card height="420px" rounded="xl" color="#292929">V-card 1</v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="420px" rounded="xl" color="#292929">V-card 2</v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-card height="150px" rounded="xl" color="#292929"></v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="150px" rounded="xl" color="#292929"></v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="150px" rounded="xl" color="#292929"></v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { useAuth } from "../composables/useAuth"

const display = ref(useDisplay())
const auth = useAuth()
definePageMeta({
  // middleware: ["auth"]
})


const setThemeFromLocalStorage = async () => {
  console.log(auth.isLoggedIn.value)
  try {
    await auth.fetchUser()
  } catch (e) {
    console.error(e)
  }
}

onMounted(setThemeFromLocalStorage)

</script>

<style scoped lang="scss">
</style>
