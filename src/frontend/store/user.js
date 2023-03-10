import { defineStore } from "pinia"

export const useUserAuth = defineStore("user", {
  state: () => ({
    user: null,
  }),



  /*
  TODO: On boot up, fetch user?
   */



  actions: {
    async fetchUser() {
      const res = await fetch("/api/users/me/")

      const user = await res.json()
      this.user = user
    },
    async login(email, password) {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const user = await res.json()
      this.user = user
    },
    async logout() {
      const res = await fetch("/api/auth/logout/", {
        method: "POST",
      })
      this.user = null
    }
  },
})
