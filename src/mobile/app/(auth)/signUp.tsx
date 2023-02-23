import { useState } from 'react'
import { TextField, Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const { createAccount } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailError, setEmailError] = useState('')

  const submit = async () => {
    try {
      const resp = await createAccount(email.trim(), password)
      if (resp.status === 400) {
        if (resp.data.email) {
          setEmailError(resp.data.email[0])
          
          // Trigger validation
          setEmail(email + '1')
          setTimeout(() => {
            setEmail(email)
          }, 0)
        }
      } else {
      }
    } catch (e) {
      console.error(e)
    }
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
            height: 40,
          }}
          style={{
            fontSize: 24,
          }}
          label="Email"
          keyboardType="email-address"
          value={email.trim()}
          placeholder="email@example.com"
          validate={['required', 'email', () => !emailError]}
          validationMessage={[
            'Email is required',
            'Email is invalid',
            emailError,
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
            setEmail(text.trim())
            setEmailError('')
          }}
        />
        <TextField
          fieldStyle={{
            width: '100%',
            borderBottomColor: '#eee',
            borderBottomWidth: 2,
            height: 40,
          }}
          style={{
            fontSize: 24,
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
