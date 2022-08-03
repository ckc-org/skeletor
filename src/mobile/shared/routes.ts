import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type AppScreenProps<Screen extends keyof AppRoute> = NativeStackScreenProps<AppRoute, Screen>
export type AppRoute = {
  Home: undefined
}
