

export const useRequest: typeof useFetch = (url, opts?) => {
    const config = useRuntimeConfig()

    const headers = {
        ...opts?.headers,
        credentials: 'include',
    }

    return useFetch(url, {
        baseURL: `${config.public.server_url}`,
        headers,
        ...opts
    })
}


