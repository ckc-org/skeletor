import { useRouter } from 'expo-router'
import { Button, Text, View } from 'react-native-ui-lib'

export default () => {
  const router = useRouter()

  return (
    <View
      flex
      center
      style={{
        marginTop: '30%',
        justifyContent: 'space-between',
        height: '70%',
      }}
    >
      <Text text20>App Title</Text>
      <View width={'85%'} style={{ marginBottom: '10%' }}>
        <Button
          label="Sign Up"
          borderRadius={'5%'}
          onPress={() => router.push('/signUp')}
        />
        <Button
          label="Sign In"
          borderRadius={'5%'}
          backgroundColor={'#fff'}
          color={'#000'}
          fontWeight={'bold'}
          onPress={() => router.push('/signIn')}
        />
      </View>
    </View>
  )
}
