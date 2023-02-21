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
        axiosInstance.defaults.headers.common['X-CSRFToken'] = csrfCookie[0].split(';')[0].split('=')[1]
      }
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { axiosInstance as axios }