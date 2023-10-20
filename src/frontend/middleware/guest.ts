import {userStore} from "~/store/user";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
    // unused still but should mostly likely work
    // const csrftoken = useCookie('csrftoken')
    // const sessionid = useCookie('sessionid')
    // if (csrftoken.value || sessionid.value) {
    //     return navigateTo('/dashboard')
    // }

    // Are we logged in? If so, redirect to dashboard
    // const {isLoggedIn} = useAuth()
    // if(isLoggedIn.value)
    //   return navigateTo('/dashboard')

    // Are we logged in? If so, redirect to dashboard
    const user = userStore()
    if (user.isLoggedIn)
        return navigateTo('/dashboard')
})
