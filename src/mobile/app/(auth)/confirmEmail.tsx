import { TextField, Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const { signIn } = useAuth()

  const confirmEmail = () => {
    signIn()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Enter the code we sent your email here:</Text>
      <TextField></TextField>
      <Button onPress={confirmEmail} label="Submit" />
    </View>
  )
}
