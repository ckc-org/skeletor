import { useState } from 'react'
import { TextField, Button, Text, View } from 'react-native-ui-lib'
import { axios } from '../../requests'

export default () => {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailError, setEmailError] = useState('')

  const [emailSent, setEmailSent] = useState(false)

  const submit = async () => {
    try {
      axios.post('/passwordreset/', {
        email: email.trim(),
      })
      setEmailSent(true)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '85%',
        }}
      >
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
          validateOnChange
          onChangeValidity={(valid) => {
            setEmailValid(valid)
          }}
          enableErrors
          onChangeText={(text) => {
            setEmail(text.trim())
            setEmailError('')
            setEmailSent(false)
          }}
        />
        <Button
          onPress={submit}
          label="Send Password Recovery Email"
          labelStyle={{ fontSize: 16 }}
          disabled={!emailValid || emailSent}
        />
      </View>
    </View>
  )
}
