import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          Home
        </Text>
    </View >
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
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
