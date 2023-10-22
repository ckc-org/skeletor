<template>
  <div class="fade-in">
    <v-sheet
      v-if="isLoading"
      class="d-flex justify-center align-center"
      height="90vh"
    >
      <v-progress-circular indeterminate />
    </v-sheet>
    <NuxtLayout v-else>
      <NuxtPage/>
      <Snackbar/>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from "~/store/user"

const user = userStore()
const isLoading = ref(true)  // Added loading state

onMounted(async () => {
  // Fetch the user's data, the page redirects and such depend on this data
  // before continuing
  try {
    await user.fetchUser()
  } catch (e) {
    // We don't care if this fails, it just means the user isn't logged in
  } finally {
    isLoading.value = false  // Update loading state after fetching the user
  }
})
</script>

<style scoped lang="stylus">
</style>
