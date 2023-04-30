export const useRequest: typeof useFetch = (url, opts?) => {
    const config = useRuntimeConfig()
    return useFetch(url, {baseURL: `${config.public.server_url}`, ...opts})
}
