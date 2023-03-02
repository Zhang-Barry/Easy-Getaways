import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Logged In</Text>
      <Button title="Log Out" onPress={() => navigation.popToTop()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});