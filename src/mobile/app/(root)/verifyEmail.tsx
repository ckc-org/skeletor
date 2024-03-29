import { StyleSheet } from 'react-native'
import { Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { axios } from '../../requests'
import { useEffect, useState } from 'react'

export default () => {
  const { user, signOut, verifyEmail } = useAuth()

  const [code, setCode] = useState('')
  const [resendButtonDisabled, setResendButtonDisabled] = useState(true)

  const submit = (newestCode: string) => {
    verifyEmail(newestCode)
  }

  const resend = async () => {
    try {
      await axios.post('/users/resend_otp_email_verification/')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // Enable resend button after 5 seconds
    const timeout = setTimeout(() => {
      setResendButtonDisabled(false)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <View
      flex
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          width: '85%',
          height: '50%',
        }}
      >
        <Text>
          Enter the code we sent your email ({user ? user.email : ''}) here:
        </Text>
        <Text
          style={{
            color: 'red',
          }}
        >
          This will always succeed, even if the code is wrong.
        </Text>
        <OTPInputView
          pinCount={6}
          onCodeChanged={setCode}
          autoFocusOnLoad
          onCodeFilled={submit}
          codeInputFieldStyle={styles.baseInputStyle}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        <Button
          disabled={resendButtonDisabled}
          onPress={resend}
          label="Resend code"
        />
        <Button onPress={signOut} label="Sign Out" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  baseInputStyle: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    backgroundColor: '#ddd',
    borderRadius: 8,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
})
