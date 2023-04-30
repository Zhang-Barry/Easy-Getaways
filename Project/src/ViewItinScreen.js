import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EditItinScreen from './EditItinScreen';
import { deleteItin } from './actions/itin';
import { useDispatch, useSelector } from 'react-redux';
import { getMyItinsFromServer } from './actions/itin';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import TimelineComponent from './TimelineComponent';
import * as Clipboard from 'expo-clipboard';
import {REACT_APP_API_URL} from '@env'

const Stack = createStackNavigator();

const ViewItinScreen = ( {route, navigation} ) => {

  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const itinState = useSelector(state => state.itin);

  // get itinerary from global state first... If doesn't exist, use itin from passed in parameters.
  let itin = itinState.filter(obj => {return obj.tid === route.params.itin.tid})[0];
  if (!itin) itin = route.params.itin;

  const jwt = authState["access"]
  const uid = authState["user"]["pk"]

  const [loading, setLoading] = useState(false);

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

  const handleShare = async () => {
    const shareUrl = `${REACT_APP_API_URL}/itineraries/view_itin/${itin.tid}`;
    await Clipboard.setStringAsync(shareUrl);

    Alert.alert('Share', 'Itinerary URL has been copied to clipboard.', [
      {
        text: 'OK',
        style: 'normal',
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
      <ScrollView>
      <View style={styles.container}>

        <Spinner
          visible={loading}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />
          <Text style={styles.titleText}>{itin.title}</Text>
          {/* <Text style={styles.locationText}>{itin.city}, {itin.state}, {itin.country}</Text> */}
          {renderLocation()}
          <Text style={styles.descriptionText}>{ (itin.description.length > 1) ? itin.description : "This itinerary does not have a description." }</Text>
          <Text style={styles.metadataText}>Created at {itin.created_at}</Text>
          <Text style={styles.titleTextSecondary}>Destinations</Text>
          <TimelineComponent itin={itin}/>

          <TouchableOpacity title="Share Itinerary" style={styles.button} onPress={() => handleShare()}>
                  <Text style={styles.buttonText} >Share...</Text>
          </TouchableOpacity>
          {
            (itin.created_by == uid) ?
              <View>
                <View style={{marginTop: 50}}></View>
                <TouchableOpacity title="Edit Itinerary" style={styles.button} onPress={() => navigation.navigate("EditItinScreen", {itin: itin})}>
                  <Text style={styles.buttonText} >Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity title="Delete Itinerary" style={{...styles.button, backgroundColor:"crimson"}} onPress={() => handleDeleteOnClick()}>
                <Text style={styles.buttonText} >Delete</Text>
                </TouchableOpacity>
              </View>
            : ""
          }



          <View style={{marginTop: 50}}></View>
      </View>
      </ScrollView>
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