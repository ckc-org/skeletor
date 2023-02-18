import { Avatar, Text, View } from 'react-native-ui-lib';

export default () => {
  return (
    <View flex paddingH-25 paddingT-120>
      <View flex row>
        <Avatar size={100}></Avatar>
        <Text gray30 text20>Username</Text>
      </View>
    </View>
  )
}