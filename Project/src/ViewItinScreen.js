import React, { useState } from 'react';
import {Text, View, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ViewItinScreen = ( {route} ) => {
  const tid = route.params.tid;
  const itin = useSelector(state => state.itin).filter(obj => {return obj.tid === tid})[0]

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{itin.title}</Text>
      <Text style={styles.locationText}>{itin.city}, {itin.state}, {itin.country}</Text>
      <Text style={styles.descriptionText}>{itin.description}</Text>
      <Text style={styles.metadataText}>Created at {itin.created_at}</Text>
      <Text style={styles.titleTextSecondary}>Timeline</Text>


      <Button title="Edit This Itinerary"/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 700,
    marginTop: 30,
    marginLeft: 15,
  },
  locationText: {
    fontWeight: 700,
    marginLeft: 15,
    color: 'gray',
  },
  descriptionText: {
    marginLeft: 15,
    marginTop: 5,
    fontSize: 16,
  },
  metadataText: {
    marginTop: 15,
    marginLeft: 15,
    color: "gray",
  },
  titleTextSecondary: {
    fontSize: 30,
    fontWeight: 700,
    marginTop: 30,
    marginLeft: 15,
  }
});

export default ViewItinScreen;