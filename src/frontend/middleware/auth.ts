import {userStore} from "~/store/user";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
    // Wait until the user is loaded
    const user = userStore()

    // If the user is not logged in, redirect to the login page
    if (!user.isLoggedIn) {
        return navigateTo('/')
    }

    // If the user is logged in, continue
    return
})
