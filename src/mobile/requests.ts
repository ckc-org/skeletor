import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage  from '@react-native-async-storage/async-storage'

const axiosInstance = axios.create({
  baseURL: Constants.expoConfig.extra.apiBaseURL,
  withCredentials: false,
})

// Load the token from storage when app loads
const loadToken = async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`
  }
}

loadToken()

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response.config.url)
    // If login request or user-create request, get the token
    if (response.config.url === '/auth/login/' || (response.config.url === '/users/' && response.config.method === 'post')) {
      // Store the token in storage
      const token = response.data.token
      AsyncStorage.setItem('token', token)
      // Set the token in the header
      axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`
    } else if (response.config.url === '/auth/logout/') {
      // Remove the token from storage and the header
      AsyncStorage.removeItem('token')
      axiosInstance.defaults.headers.common['Authorization'] = ''
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { axiosInstance as axios }
