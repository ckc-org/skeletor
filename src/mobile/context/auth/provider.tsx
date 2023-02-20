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
      authenticated: boolean
      email: string
      id: number
    }
  | {
      authenticated: boolean
    }

const unauthenticatedUser: SelfUser = {
  authenticated: false,
}

const authenticatedUser: SelfUser = {
  email: 'example@user.com',
  authenticated: true,
}

type Auth = {
  signIn: () => void
  signOut: () => void
  user: SelfUser
}

const authData = {
  signIn: () => {},
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
    console.log('inAuthGroup', inAuthGroup)
    console.log('authed', user.authenticated)

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user.authenticated &&
      !inAuthGroup
    ) {
      // Redirect to the signIn page.
      router.replace('/signIn')
    } else if (user.authenticated && inAuthGroup) {
      // Redirect away from the signIn page.
      router.replace('/profile')
    }
  }, [user, segments])
}

export const AuthProvider = (props: PropsWithChildren) => {
  const [user, setAuth] = useState<SelfUser>(unauthenticatedUser)

  useProtectedRoute(user)

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setAuth(authenticatedUser)
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
