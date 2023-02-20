import { TextField, Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const { signIn, user } = useAuth()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Email:</Text>
      <TextField></TextField>
      <Text>Password:</Text>
      <TextField></TextField>
      <Button onPress={signIn} label="Sign In" />
    </View>
  )
}
