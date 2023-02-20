import { Text, View } from 'react-native'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const { signIn, user } = useAuth()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{user.authenticated}</Text>
      <Text onPress={signIn}>Sign In</Text>
    </View>
  )
}
