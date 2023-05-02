
export default defineNuxtRouteMiddleware(async (_to, _from) => {
    // unused still but should mostly likely work
    const csrftoken = useCookie('csrftoken')
    const sessionid = useCookie('sessionid')
    if (csrftoken.value || sessionid.value) {
        return navigateTo('/dashboard')
    }
})
