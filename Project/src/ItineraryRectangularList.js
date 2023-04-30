import React, {useState} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity, Text, ScrollView} from 'react-native';
import RectangularListItem from './RectangularListItem';
import { StatusBar } from 'expo-status-bar';
import { getMyItinsFromServer } from './actions/itin';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { createStackNavigator } from '@react-navigation/stack';
import ViewItinScreen from './ViewItinScreen';
import CreateItinScreen from './CreateItinScreen';
import AutoGenerateItin from './Tabs/AutoGenerateItin';

const Stack = createStackNavigator();

const ItineraryRectangularList = ( {navigation} ) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    // const [items, setItems] = useState(data);
    const auth = useSelector(state => state.auth);
    const items = useSelector(state => state.itin);


    const handleGetMyItinsFromServer = async () => {
      if (!auth["isAuthenticated"]) {
        alert("Please login first.")
        return;
      }
      const jwt = auth["access"]
      const uid = auth["user"]["pk"]
      setLoading(true);
      await getMyItinsFromServer(jwt, uid)(dispatch);
      setLoading(false);
    }

    const handleAddItem = (navigation) => {
      if (!auth["isAuthenticated"]) {
        alert("Please login first.")
        return;
      }
        navigation.navigate("CreateItinScreen", {itin: {
          title: null,
          description: null,
          country: null,
          state: null,
          city: null,
          itinerary: null,
        }});
    };

    const ItinListScreen = ( {navigation} ) => {
      return (
        <SafeAreaView style={styles.container}>
        {
          (items.length == 0) ?
            <Text style={styles.subText}>{"\n\n"}No itineraries.</Text>
            :
            ""
        }
        {
          (!auth.isAuthenticated) ?
            <Text style={styles.subText}>Log in to create and edit itineraries.</Text>
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
              keyExtractor={item => item.tid.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate("ViewItinScreen", {itin: items.filter(obj => {return obj.tid === item.tid})[0]})}>
                  <RectangularListItem
                      title={item.title}
                      subtitle={item.description}
                  />
                </TouchableOpacity>
              )}
          />
          <TouchableOpacity onPress={handleGetMyItinsFromServer} style={styles.button}>
              <Text style={styles.buttonText}>Refresh List</Text>
           </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAddItem(navigation)} style={styles.button}>
              <Text style={styles.buttonText}>Create New Itinerary</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => navigation.navigate("AutoGenerateScreen")} style={styles.button}>
              <Text style={styles.buttonText}>Auto-Generate Itinerary</Text>
           </TouchableOpacity>
      </SafeAreaView>
      )
    }

  return (
    <Stack.Navigator initialRouteName="SettingsRoot">
      <Stack.Screen name="ItinListScreen" component={ItinListScreen} options={{title: "Itineraries"}}/>
      <Stack.Screen name="ViewItinScreen" component={ViewItinScreen} options={{title: "View Itinerary", headerShown: false}}/>
      <Stack.Screen name="CreateItinScreen" component={CreateItinScreen} options={{title: "Create Itinerary"}}/>
      <Stack.Screen name="AutoGenerateScreen" component={AutoGenerateItin} options={{title: "Auto-Generate Itinerary"}}/>
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

export default ItineraryRectangularList;