<template>
  <div>
    <div v-if="isLoading" class="loading">
      <!-- loading text? -->
    </div>
    <div v-else class="content">
      <NuxtLayout>
        <NuxtPage/>
        <Snackbar />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { userStore } from "~/store/user";

const user = userStore()
const isLoading = ref(true);  // Added loading state

onMounted(async () => {
  // Fetch the user's data, the page redirects and such depend on this data
  // before continuing
  try {
    await user.fetchUser()
  } catch(e) {
    // We don't care?!
  }

  isLoading.value = false;  // Update loading state after fetching the user
});
</script>

<style scoped lang="stylus">
.loading, .content
  transition opacity 0.5s ease-in-out

.loading
  opacity 0

.content
  opacity 1
</style>
