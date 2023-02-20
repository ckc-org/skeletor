import { Avatar, Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const { signOut, user } = useAuth()

  return (
    <View flex paddingH-25 paddingT-120>
      <View flex row>
        <Avatar size={100}></Avatar>
        <Text gray30 text20>
          {user.email}
        </Text>
      </View>
      <Button bg-blue onPress={signOut}>
        <Text white>Sign Out</Text>
      </Button>
    </View>
  )
}
