import {userStore} from "~/store/user";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
    // Wait until the user is loaded
    const user = userStore()

    // here I need to wait for the user to be fetched or not, which is "user.fetchUserHasBeenRan"
    if (!user.fetchUserHasBeenRan) {

      try {
        // Wait for fetch to complete
        await user.$state.fetchUserHasBeenRan

      } catch {
        // Handle error - redirect to login
      }
    }

    // If the user is not logged in, redirect to the login page
    if (!user.isLoggedIn) {
        console.log("User is not logged in, redirecting to login page")
        return navigateTo('/')
    }

    console.log("User is logged in, continuing to route")

})
