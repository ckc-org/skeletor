import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter, useSegments } from 'expo-router'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { axios } from '../../requests'

export type SelfUser = {
  id: number
  email: string
  email_verified: boolean
  first_name: string
  last_name: string
}

type Auth = {
  signIn: (email: string, password: string) => Promise<boolean>
  createAccount: (email: string, password: string) => Promise<boolean>
  verifyEmail: (code: string) => Promise<boolean>
  signOut: () => void
  user: SelfUser | null
}

const AuthContext = createContext<Auth>({} as Auth)

// This hook can be used to access the user info.
export const useAuth = () => {
  return useContext(AuthContext)
}

// This hook will protect the route access based on user authentication.
const useProtectedRoute = (user: SelfUser | null) => {
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the signIn page.
      router.replace('/splash')
    } else if (user && !user.email_verified && segments[1] !== 'verifyEmail') {
      // Force user to verify email before they can do anything as an authed user.
      router.replace('/verifyEmail')
    } else if (user && user.email_verified && segments[1] === 'verifyEmail') {
      // Redirect user to home page after email verification.
      router.replace('/')
    } else if (user && inAuthGroup) {
      // Redirect away from the signIn page.
      router.replace('/')
    }
  }, [user, segments])
}

const UserStorageKey = '@user-state'

export const AuthProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<SelfUser | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem(UserStorageKey)
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
    loadUser()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem(UserStorageKey, JSON.stringify(user))
  }, [user])

  useProtectedRoute(user)

  const signIn = async (email: string, password: string) => {
    try {
      const data = (
        await axios.post('/auth/login/', {
          email,
          password,
        })
      ).data as SelfUser
      console.log(data)

      setUser(data)
    } catch (e) {
      console.error(e)
      return false
    }
    return true
  }

  const signOut = async () => {
    setUser(null)
    try {
      await axios.post('/auth/logout/')
    } catch (e) {
      console.error(e)
    }
  }

  const createAccount = async (email: string, password: string) => {
    try {
      const resp = await axios.post('/users/', {
        email,
        password,
        send_otp_email_verification: true,
      })
      setUser({ ...resp.data })
    } catch (e) {
      console.error(e)
      return false
    }
    return true
  }

  const verifyEmail = async (code: string) => {
    try {
      const resp = await axios.post('/users/verify_email/', {
        otp_code: code,
      })

      setUser({ ...resp.data })
    } catch (e) {
      console.error(e)
      return false
    }
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        createAccount,
        verifyEmail,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
