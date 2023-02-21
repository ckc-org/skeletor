import axios from 'axios'

const baseURL = 'http://localhost:8000/api'

const axiosInstance = axios.create({ baseURL, withCredentials: true })

axiosInstance.interceptors.response.use(
  (response) => {
    const setCookie = response.headers['set-cookie']

    if (setCookie) {
      const csrfCookie = setCookie.filter((cookie: string) => {
        return cookie.startsWith('csrftoken=')
      })
      if (csrfCookie) {
        try {
          axiosInstance.defaults.headers.common['X-CSRFToken'] = csrfCookie[0]
            .split(';')[0]
            .split('=')[1]
        } catch (e) {
          axiosInstance.defaults.headers.common['X-CSRFToken'] = ''
        }
      }
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.request.use((request) => {
  if (
    request.method === 'post' ||
    request.method === 'patch' ||
    request.method === 'put' ||
    request.method === 'delete'
  ) {
    if (!axiosInstance.defaults.headers.common['X-CSRFToken']) {
      axiosInstance.defaults.headers.common['X-CSRFToken'] = ''
    }
  }
  return request
})

export { axiosInstance as axios }
