import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EditItinScreen from './EditItinScreen';
import { deleteItin } from './actions/itin';
import { useDispatch, useSelector } from 'react-redux';
import { getMyItinsFromServer } from './actions/itin';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Stack = createStackNavigator();

const ViewItinScreen = ( {route, navigation} ) => {

  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const jwt = authState["access"]
  const uid = authState["user"]["pk"]

  const [loading, setLoading] = useState(false);

  const itin = route.params.itin
  const tid = itin.tid

  const deleteItinFromServer = async () => {
    setLoading(true);
    await deleteItin(jwt, uid, tid)(dispatch);
    await (getMyItinsFromServer)(jwt, uid)(dispatch);
    setLoading(false);
    navigation.goBack()
  }

  const handleDeleteOnClick = () => {
    Alert.alert('Delete Itinerary?', 'Deleted itineraries cannot be recovered', [
      {
        text: 'Delete',
        onPress: () => deleteItinFromServer(),
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);

  }

  const renderLocation = () => {
    if (itin.country == "NULL") {
          return <Text style={{...styles.locationText, fontWeight:"normal"}}>Location not specified.</Text>
    } else if (itin.state == "NULL") {
          return <Text style={styles.locationText}>{itin.country}</Text>
    } else if (itin.city == "NULL") {
          return <Text style={styles.locationText}>{itin.state}, {itin.country}</Text>
    }

    return <Text style={styles.locationText}>{itin.city}, {itin.state}, {itin.country}</Text>
  }

  const ViewItinPage = () => {
    return (
      <View style={styles.container}>

        <Spinner
          visible={loading}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />

        <ScrollView>
          <Text style={styles.titleText}>{itin.title}</Text>
          {/* <Text style={styles.locationText}>{itin.city}, {itin.state}, {itin.country}</Text> */}
          {renderLocation()}
          <Text style={styles.descriptionText}>{itin.description}</Text>
          <Text style={styles.metadataText}>Created at {itin.created_at}</Text>
          <Text style={styles.titleTextSecondary}>Timeline</Text>
          <Text>{JSON.stringify(itin.itinerary)} TO BE CREATED LATER</Text>
    
          <View style={{marginTop: 50}}></View>
          <TouchableOpacity title="Edit Itinerary" style={styles.button} onPress={() => navigation.navigate("EditItinScreen", {itin: itin})}>
            <Text style={styles.buttonText} >Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity title="Delete Itinerary" style={{...styles.button, backgroundColor:"crimson"}} onPress={() => handleDeleteOnClick()}>
          <Text style={styles.buttonText} >Delete</Text>
          </TouchableOpacity>
          <View style={{marginTop: 50}}></View>
        </ScrollView>
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName="ViewItinRoute">
      <Stack.Screen name="ViewItinPage" component={ViewItinPage} options={{title: "View Itinerary"}}/>
      <Stack.Screen name="EditItinScreen" component={EditItinScreen} options={{title: "Edit Itinerary"}}/>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 18,
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
  },
  locationText: {
    fontWeight: 700,
    color: 'gray',
  },
  descriptionText: {
    marginTop: 5,
    fontSize: 16,
  },
  metadataText: {
    marginTop: 15,
    color: "gray",
  },
  titleTextSecondary: {
    fontSize: 30,
    fontWeight: 700,
    marginTop: 30,
  },
  button: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    borderRadius: 0,
    marginTop: 10,
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  buttonText: {
    alignSelf:"center",
    color: "white",
    fontSize: 20,
  }
 }
);

export default ViewItinScreen;