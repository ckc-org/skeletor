import { ofetch } from "ofetch"

export const useRequest = (url: RequestInfo, opts?: RequestInit) => {
  const config = useRuntimeConfig()
  const csrfToken = useCookie("csrftoken")
  const headers = {
    "X-CSRFToken": csrfToken.value || "",
    ...opts?.headers,
  }

  const method = (opts?.method?.toUpperCase() || "GET") as
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"

  // Create a new options object to avoid modifying the original opts
  const optionsFinal = {
    ...opts,
    headers,
    method,
  }

  return ofetch(url, {
    baseURL: `${config.public.server_url}`,

    // include cookies
    credentials: "include",

    // dont cache requests?!
    //initialCache: false,

    // dont THROW errors, return them
    //ignoreResponseError: true,

    ...optionsFinal,
  })
}
