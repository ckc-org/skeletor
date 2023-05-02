export const useRequest: typeof useFetch = (url, opts?) => {
    const config = useRuntimeConfig()
    const csrfToken = useCookie('csrftoken')
    const headers = {
        'X-CSRFToken': csrfToken.value || '',
        ...opts?.headers,
    }

    return useFetch(url, {
        baseURL: `${config.public.server_url}`,
        credentials: 'include',
        headers,
        ...opts
    })
}
