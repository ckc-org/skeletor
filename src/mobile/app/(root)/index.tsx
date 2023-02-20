import { useRouter } from 'expo-router'
import { Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <View flex center>
      <Text bg-blue>Home</Text>
      {Object.keys(user).map((k) => (
        <Text bg-blue key={k}>
          {k}: {String(user[k])}
        </Text>
      ))}
      <Button label="To profile" onPress={() => router.push('profile')} />
    </View>
  )
}
