<!-- SnackbarComponent.vue -->
<template>
  <v-snackbar v-model="snackbarStore.show" :color="snackbarStore.color">
    {{ snackbarStore.message }}
    <template #actions>
      <Button variant="text" @click="snackbarStore.closeSnackbar">
        <v-icon>mdi-close</v-icon>
      </Button>
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
