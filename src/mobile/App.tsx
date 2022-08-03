import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NativeBaseProvider } from "native-base"
import { AppRoute, theme } from "./shared"
import * as Home from "./features/home"

const AppStack = createNativeStackNavigator<AppRoute>()

export default function App() {
  return (
    <NativeBaseProvider
      theme={theme}
      config={{ suppressColorAccessibilityWarning: true }}
    >
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Home" component={Home.HomeScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
