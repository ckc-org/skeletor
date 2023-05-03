import {MaybeRef} from '@vueuse/core';

export const useRequest = <T = any>(url: MaybeRef<string>, opts?: RequestInit) => {
    const config = useRuntimeConfig();
    const csrfToken = useCookie('csrftoken');
    const headers = {
        'X-CSRFToken': csrfToken.value || '',
        ...opts?.headers,
    };
    const method = (opts?.method?.toUpperCase() || 'GET') as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

    return useFetch<T>(url, {
        baseURL: `${config.public.server_url}`,
        credentials: 'include',
        headers,
        // @ts-ignore
        method,
        ...opts,
    });
};
