import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-web';

const PlaceSmallCard = ({ name, location }) => {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>McDonald's</Text>
        <Text style={styles.subtitle}>good food here</Text>
        {/* {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>} */}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginRight: 20,
    height: 150,
    width: 200,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default PlaceSmallCard;