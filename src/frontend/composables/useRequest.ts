//import {MaybeRef} from '@vueuse/core';
import {ofetch} from "ofetch";

export const useRequest = <T = any>(url: RequestInfo, opts?: RequestInit) => {
    const config = useRuntimeConfig();
    const csrfToken = useCookie('csrftoken');
    const headers = {
        'X-CSRFToken': csrfToken.value || '',
        ...opts?.headers,
    };
    const method = (opts?.method?.toUpperCase() || 'GET') as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

    console.log(`useRequest url -> ${config.public.server_url}${url}`)

    return ofetch(url, {
        baseURL: `${config.public.server_url}`,

        // include cookies
        credentials: 'include',

        // dont cache requests?!
        //initialCache: false,

        // dont THROW errors, return them
        //ignoreResponseError: true,

        headers,
        // @ts-ignore
        method,
        ...opts,
    });
};
