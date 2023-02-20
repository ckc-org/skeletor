import { useRouter } from 'expo-router'
import { TextField, Button, Text, View } from 'react-native-ui-lib'

export default () => {
  const router = useRouter()

  const createAccount = () => {
    router.push('/confirmEmail')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Email:</Text>
      <TextField></TextField>
      <Text>Password:</Text>
      <TextField></TextField>
      <Button onPress={createAccount}label='Create Account' />
    </View>
  )
}
