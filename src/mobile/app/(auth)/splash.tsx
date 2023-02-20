import { useRouter } from 'expo-router'
import { Button, Text, View } from 'react-native-ui-lib'

export default () => {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Splash</Text>
      <Button label="Sign Up" onPress={() => router.push('/signUp')} />
      <Button label="Sign In" onPress={() => router.push('/signIn')} />
      <Button label="Forgot Password" onPress={() => router.push('/forgotPassword')} />
    </View>
  )
}
