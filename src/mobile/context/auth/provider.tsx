import { useRouter, useSegments } from 'expo-router'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { axios } from '../../requests'

type SelfUser =
  | {
      authenticated: true
      email: string
      id: number
    }
  | {
      authenticated: false
    }

const unauthenticatedUser: SelfUser = {
  authenticated: false,
}

const authenticatedUser: SelfUser = {
  id: 1,
  email: 'example@user.com',
  authenticated: true,
}

type Auth = {
  signIn: (email: string, password: string) => void
  signOut: () => void
  initCSRF: () => void
  user: SelfUser
}

const authData = {
  signIn: (email: string, password: string) => {},
  signOut: () => {},
  initCSRF: () => {},
  user: unauthenticatedUser,
}

const AuthContext = createContext<Auth>(authData)

// This hook can be used to access the user info.
export const useAuth = () => {
  return useContext(AuthContext)
}

// This hook will protect the route access based on user authentication.
const useProtectedRoute = (user: SelfUser) => {
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user.authenticated &&
      !inAuthGroup
    ) {
      // Redirect to the signIn page.
      router.replace('/splash')
    } else if (user.authenticated && inAuthGroup) {
      // Redirect away from the signIn page.
      router.replace('/')
    }
  }, [user, segments])
}

export const AuthProvider = (props: PropsWithChildren) => {
  const [user, setAuth] = useState<SelfUser>(unauthenticatedUser)

  const initCSRF = async () => {
    try {
      axios.get('/csrf/')
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    initCSRF()
  }, [])

  useProtectedRoute(user)

  const signIn = async (email: string, password: string) => {
    email = 'admin@admin.com'
    password = 'admin'
    console.log('making request', `email: ${email}, password: ${password}`)
    try {
      const resp = await axios.post('/auth/login/', {
        email,
        password,
      }) as SelfUser
      setAuth({
        authenticated: true,
        email,
        id: resp.data.id,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setAuth(unauthenticatedUser)
        },
        initCSRF,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
