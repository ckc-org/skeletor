import { Avatar, Button, Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const { signOut, user } = useAuth()

  if (!user) return null

  return (
    <View flex paddingH-25 paddingT-120>
      <View
        flex
        row
        style={{
          alignItems: 'center',
        }}
      >
        <Avatar
          backgroundColor="#ddd"
          size={100}
          containerStyle={{
            marginRight: 40,
          }}
        />
        <Text style={{ fontSize: 30 }}>Username</Text>
      </View>
      <View flex>
        <Text style={{ fontSize: 20 }}>{user.email}</Text>
      </View>
      <Button
        bg-blue
        onPress={signOut}
        style={{
          marginBottom: 40,
        }}
        label="Sign Out"
      />
    </View>
  )
}
