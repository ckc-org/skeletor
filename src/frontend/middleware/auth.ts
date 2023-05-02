
export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const csrftoken = useCookie('csrftoken')

    if (!csrftoken.value) {
        csrftoken.value = null
        return navigateTo('/')
    }
})
