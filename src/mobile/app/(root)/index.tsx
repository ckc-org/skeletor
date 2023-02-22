import { Text, View } from 'react-native-ui-lib'
import { useAuth } from '../../context/auth/provider'

export default () => {
  const { user } = useAuth()

  if (!user) return <Text bg-blue>Loading...</Text>

  return (
    <View flex center>
      <Text bg-blue text10>Home</Text>
    </View>
  )
}
