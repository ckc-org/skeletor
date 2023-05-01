function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


export const useRequest: typeof useFetch = (url, opts?) => {
    const config = useRuntimeConfig()

    const headers = {
        'X-CSRFToken': getCookie('csrftoken'),
        ...opts?.headers,
    }

    return useFetch(url, {
        baseURL: `${config.public.server_url}`,
        credentials: 'include',
        headers,
        ...opts
    })
}
