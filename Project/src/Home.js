import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button 
        title="Log In"
        onPress={() => navigation.navigate("Log In")}
      />
      <Button 
        title="Sign up"
        onPress={() => navigation.navigate("Sign Up")}
      />
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