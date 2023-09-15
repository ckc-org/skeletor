
export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const csrftoken = useCookie('csrftoken')
    const auth = useAuth()

    if (!csrftoken.value || auth.isLoggedIn?.value === false) {
        csrftoken.value = null
        return navigateTo('/')
    }
})
