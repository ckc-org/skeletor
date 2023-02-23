import { Slot } from 'expo-router'
import { AuthProvider } from '../context/auth/provider'

export default () => (
  <AuthProvider>
    <Slot></Slot>
  </AuthProvider>
)
