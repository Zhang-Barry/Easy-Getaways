import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import TimelineDestinationComponent from './TimelineDestinationComponent';

export default function TimelineComponent({ navigation }) {
  return (
    <View style={styles.container}>
      <TimelineDestinationComponent/>
      <TimelineDestinationComponent/>
      <TimelineDestinationComponent/>
      <Text style={styles.subText}>End of Itinerary.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gainsboro',
    borderRadius: 5,
  },
  subText: {
    marginTop: 5,
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    // fontStyle: 'italic',
    fontWeight: 'bold',
  }
});