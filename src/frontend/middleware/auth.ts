import {UserT, UserWithoutPasswordT} from "~/types/authTypes";
import {useSnackbarStore} from "~/store/snackbar";
import {RouteLocationNormalized} from "vue-router";
import {userStore} from "~/store/user";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
    // Wait until the user is loaded
    const user = userStore()

    // here I need to wait for the user to be fetched or not, which is "user.fetchUserHasBeenRan"
    if (!user.fetchUserHasBeenRan) {

      try {
        // Wait for fetch to complete
        await user.$state.fetchUserHasBeenRan

        // User is now fetched, proceed with middleware checks
          console.log("shes thurr")

      } catch {
        // Handle error - redirect to login
      }
    }

    // const csrftoken = useCookie('csrftoken')
    // const sessionid = useCookie('sessionid').value
    // const hasSession = Boolean(sessionid)
    //
    // console.log(`User has session: ${hasSession}, sessionid: ${sessionid}`)
    //
    // if(!hasSession){
    //     console.log("User is not logged in, redirecting to login page")
    //     return navigateTo('/')
    // }


    // const user = userStore()

    // If the user is not logged in, redirect to the login page
    if (!user.isLoggedIn) {
        console.log("User is not logged in, redirecting to login page")
        return navigateTo('/')
    }

    console.log("User is logged in, continuing to dashboard")


    // const redirectRoute = getUserRedirectPath(auth.authUser, _to, _from)
    // if (redirectRoute !== _to.path && redirectRoute) {
    //   return navigateTo('/dashboard')
    // }
})
