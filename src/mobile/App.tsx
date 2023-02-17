import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}>
          Username
        </Text>
        <Text style={styles.username}>
          Username
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: 'gray',
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%',
    padding: 10,
    flex: 1,
  },
  username: {
    display: 'flex',
  },
  container: {
    marginTop: 200,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
