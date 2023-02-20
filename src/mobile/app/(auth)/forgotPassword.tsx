import { TextField, Button, Text, View } from 'react-native-ui-lib'

export default () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Email:</Text>
      <TextField></TextField>
      <Button onPress={() => {console.log('Sending Recovery email')}} label="Send Password Recovery Email" />
    </View>
  )
}
