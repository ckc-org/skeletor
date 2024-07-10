// snackbarStore.ts
import { defineStore } from "pinia"

interface SnackbarState {
  message: string
  color: string
  show: boolean
}

export const useSnackbarStore = defineStore({
  id: "snackbar",
  state: (): SnackbarState => ({
    message: "",
    color: "",
    show: false,
  }),
  actions: {
    displaySnackbar(color: string, message: string) {
      if (color === "error") {
        console.error(message)
      }
      this.color = color
      this.message = message
      this.show = true
    },
    closeSnackbar() {
      this.show = false
    },
  },
})
