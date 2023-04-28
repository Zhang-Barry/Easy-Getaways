import React, {useState} from 'react';
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Text, ScrollView} from 'react-native';
import RectangularListItem from '../RectangularListItem';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { createStackNavigator } from '@react-navigation/stack';
import { getMyPlacesFromServer } from '../actions/places';

const Stack = createStackNavigator();

const PlacesTab = ( {navigation} ) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    // const [items, setItems] = useState(data);
    const auth = useSelector(state => state.auth);
    const items = useSelector(state => state.places);

    const handleGetMyPlacesFromServer = async () => {
      if (!auth["isAuthenticated"]) {
        alert("Please login first.")
        return;
      }
      const jwt = auth["access"]
      const uid = auth["user"]["pk"]
      setLoading(true);
      await getMyPlacesFromServer(jwt, uid)(dispatch);
      setLoading(false);
    }

    const PlacesListScreen = ( {navigation} ) => {
      return (
        <SafeAreaView style={styles.container}>
        {
          (items.length == 0) ?
            <Text style={styles.subText}>{"\n\n"}No Places.</Text>
            :
            ""
        }
        {
          (!auth.isAuthenticated) ?
            <Text style={styles.subText}>Log in to view saved Places.</Text>
            :
            ""
        }
          <Spinner
            visible={loading}
            textContent={''}
            textStyle={styles.spinnerTextStyle}
          />
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <FlatList
              data={items}
              keyExtractor={item => item.place_id.toString()}
              renderItem={({ item }) => (

                <TouchableOpacity onPress={ () => alert("PRESSED.") }>
                  <RectangularListItem
                      title={JSON.stringify(item)}
                      subtitle={"SUBTITILE"}
                  />
                </TouchableOpacity>


              )}
          />

          <TouchableOpacity onPress={handleGetMyPlacesFromServer} style={styles.button}>
              <Text style={styles.buttonText}>Refresh</Text>
           </TouchableOpacity>
      </SafeAreaView>
      )
    }

  return (
    <Stack.Navigator initialRouteName="SettingsRoot">
      <Stack.Screen name="PlacesListScreen" component={PlacesListScreen} options={{title: "Places", headerShown: false}}/>
      {/* <Stack.Screen name="ViewItinScreen" component={ViewItinScreen} options={{title: "View Itinerary", headerShown: false}}/> */}
      {/* <Stack.Screen name="CreateItinScreen" component={CreateItinScreen} options={{title: "Create Itinerary"}}/> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#D4F1F4',
    padding: 10,
    borderRadius: 0,
    marginTop: 1,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  subText: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    margin: 5,
  }
});

export default PlacesTab;