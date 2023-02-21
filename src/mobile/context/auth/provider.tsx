import { useRouter, useSegments } from 'expo-router'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

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
  user: SelfUser
}

const authData = {
  signIn: (email: string, password: string) => {},
  signOut: () => {},
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

  useProtectedRoute(user)

  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) => {
          const u = authenticatedUser
          u.email = email
          setAuth(u)
        },
        signOut: () => {
          setAuth(unauthenticatedUser)
        },
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
