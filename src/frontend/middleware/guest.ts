import { userStore } from "~/store/user";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const user = userStore();
  if (user.isLoggedIn) return navigateTo("/dashboard");
});
