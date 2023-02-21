import { useRouter } from 'expo-router'
import { useState } from 'react'
import { TextField, Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const { signIn } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View
      flex
      center
      style={{
        flex: 1,
        width: '100%',
      }}
    >
      <View
        flex
        style={{
          flex: 0,
          width: '85%',
        }}
      >
        <Text text20 style={{ marginBottom: 40 }}>
          Sign In
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
          onPress={() => signIn(email, password)}
          label="Sign In"
          borderRadius={'5%'}
        />
        <Button
          label="Forgot Password"
          borderRadius={'5%'}
          backgroundColor={'#fff'}
          color={'#000'}
          fontWeight={'bold'}
          onPress={() => router.push('/forgotPassword')}
        />
      </View>
    </View>
  )
}
