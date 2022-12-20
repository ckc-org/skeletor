import nextConfig from "../../next.config";
import axios from 'axios'
import API from './api'

export const logout = async () => {
  try {
    return await axios.post(`${API.base_url}/api/auth/logout/`,)
  } catch (e) {
    console.warn('Failed to log out')
    return false
  }
}

export const login = async (email: String, password: String) => {
  try {
    console.log(`${API.base_url}/api/auth/login/`)
    const res = await axios.post(
      `${API.base_url}/api/auth/login/`,
      {
        email,
        password
      },
    )
    console.log(axios.post)
  } catch (e) {
    console.warn('Could not login')
    return false
  }
}

export const is_logged_in = async () => {
  try {
    return await axios.get(
      `${API.base_url}/api/users/me/`,
      {withCredentials: true}
    )
  } catch (e) {
    console.warn('Failed is logged in check')
    return false
  }
}
