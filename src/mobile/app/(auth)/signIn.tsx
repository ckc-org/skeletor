import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { TextField, Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'
import AXIOS from 'axios'

export default () => {
  const { signIn } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailError, setEmailError] = useState('')

  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false)

  useEffect(() => {
    if (!submitButtonEnabled) {
      setSubmitButtonEnabled(emailValid && passwordValid)
    }
  }, [emailValid, passwordValid])

  const triggerValidation = () => {
    setEmail(email + '1')
    setTimeout(() => {
      setEmail(email)
    }, 0)
  }

  const signInRequest = async () => {
    try {
      const resp = await signIn(email.trim(), password)
      if (resp.status === 400) {
        if (resp.data.non_field_errors) {
          setEmailError(resp.data.non_field_errors[0])
          triggerValidation()
        }
        setEmail(email + ' ') // Trigger onChange to validate
      }
    } catch (e) {
      if (AXIOS.isAxiosError(e)) {
        setEmailError(e.message)
        triggerValidation()
      } else {
        setEmailError('Server error')
      }
    }
  }

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
            height: 40,
          }}
          style={{
            fontSize: 24,
          }}
          label="Email"
          keyboardType="email-address"
          value={email}
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
            setEmail(text)
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
            setEmail(email)
            setEmailError('')
          }}
        />
        <Button
          disabled={!submitButtonEnabled}
          onPress={signInRequest}
          label="Sign In"
          enableShadow
        />
        <Button
          label="Forgot Password"
          backgroundColor={'rgba(0,0,0,0)'}
          color={'#000'}
          fontWeight={'bold'}
          onPress={() => router.push('/forgotPassword')}
          style={{
            marginTop: 10,
            height: 50,
          }}
        />
      </View>
    </View>
  )
}
