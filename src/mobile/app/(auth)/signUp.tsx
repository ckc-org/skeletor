import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { TextField, Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const { createAccount } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [validCredentials, setValidCredentials] = useState(true)

  const submit = () => {
    createAccount(email, password)
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
          value={email}
          placeholder="email@example.com"
          validate={['required', 'email', () => validCredentials]}
          validationMessage={[
            'Email is required',
            'Email is invalid',
            'Invalid credentials',
          ]}
          onBlur={() => {
            setEmailTouched(true)
          }}
          validateOnBlur={!emailTouched}
          validateOnChange={emailTouched}
          onChangeValidity={(valid) => {
            setEmailValid(valid)
          }}
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
          value={password}
          secureTextEntry
          validate={['required']}
          validationMessage={['Password is required']}
          validateOnChange
          onChangeValidity={(valid) => {
            setPasswordValid(valid)
          }}
          enableErrors
          onChangeText={(text) => {
            setPassword(text)
          }}
        />
        <Button
          disabled={!emailValid || !passwordValid}
          onPress={submit}
          label="Create Account"
          borderRadius={'5%'}
        />
      </View>
    </View>
  )
}
