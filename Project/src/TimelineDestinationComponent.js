import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

export default function TimelineDestinationComponent({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.numContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    margin: 1,
    padding: 5,
  },
  numContainer: {
    backgroundColor: 'silver',
    borderRadius: 5,
    marginTop: 1,
    padding: 25,
    height: 25,
    width: 10,
  },
});