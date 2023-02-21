import { useRouter } from 'expo-router'
import { useState } from 'react'
import { TextField, Button, Text, View } from 'react-native-ui-lib'

export default () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createAccount = (email: string, password: string) => {
    console.log(email, password)
    router.push('/confirmEmail')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        flex
        style={{
          flex: 0,
          width: '85%',
        }}
      >
        <Text text20 style={{ marginBottom: 40 }}>
          Create Account
        </Text>
        <TextField
          fieldStyle={{
            width: '100%',
            borderBottomColor: '#eee',
            borderBottomWidth: 2,
          }}
          label="Email"
          placeholder="email@example.com"
          validate={['required', 'email']}
          validationMessage={['Email is required', 'Email is invalid']}
          enableErrors
          onChangeText={(text) => {
            setEmail(text)
          }}
        />
        <TextField
          fieldStyle={{
            width: '100%',
            borderBottomColor: '#eee',
            borderBottomWidth: 2,
          }}
          label="Password"
          secureTextEntry
          validate={['required', 'email']}
          validationMessage={['Email is required', 'Email is invalid']}
          enableErrors
          onChangeText={(text) => {
            setPassword(text)
          }}
        />
        <Button
          onPress={() => createAccount(email, password)}
          label="Create Account"
          borderRadius={'5%'}
        />
      </View>
    </View>
  )
}
