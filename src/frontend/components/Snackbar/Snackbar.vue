<!-- SnackbarComponent.vue -->
<template>
  <v-snackbar v-model="snackbarStore.show" :color="snackbarStore.color">
    {{ snackbarStore.message }}
    <template #actions>
      <v-btn variant="text" @click="snackbarStore.closeSnackbar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { useSnackbarStore } from "~/store/snackbar"

export default {
  setup() {
    const snackbarStore = useSnackbarStore()

    return {
      snackbarStore,
    }
  },
}
</script>
