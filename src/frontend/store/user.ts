// @ts-nocheck
import { defineStore } from "pinia";
import { UserT, UserWithoutPasswordT } from "~/types/authTypes";
import { useRequest } from "~/composables/useRequest";
import { navigateTo } from "#app";
import { useRealtimeStore } from "~/store/realtime";

export const userStore = defineStore("user", {
  id: "user",
  state: () => {
    const hasSession = useCookie("sessionid").value;

    return {
      user: null,
      isLoggedIn: Boolean(hasSession),
    };
  },
  actions: {
    setUser(user: UserT | UserWithoutPasswordT | null) {
      this.$patch({
        user: user,
        isLoggedIn: Boolean(user),
      });

      // Start listening to the websocket
      //useRealtimeStore().startListening()
    },
    async createUser(body: any) {
      const { user, token } = await useRequest("/users/", {
        method: "POST",
        body: body,
      });

      this.setUser(user);
    },
    async login(email: string, password: string, rememberMe?: boolean) {
      const { user } = await useRequest("/auth/login/", {
        method: "POST",
        body: {
          email,
          password,
          rememberMe,
        },
      });

      this.setUser(user);
    },
    async logout() {
      const csrftoken = useCookie("csrftoken");
      const res = await useRequest("/auth/logout/", { method: "POST" });
      this.setUser(null);
      csrftoken.value = null;
      navigateTo("/");
      return res;
    },
    async fetchUser() {
      try {
        const userData = await useRequest("/users/me/");
        this.setUser(userData);
      } catch (e) {
        this.setUser(null);
        eraseCookie("csrftoken");
        eraseCookie("sessionid");
        // throw new Error(error.value as any)
      }
    },
  },
});

function eraseCookie(name: string) {
  document.cookie = name + "=; Max-Age=-99999999;";
}
