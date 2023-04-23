import React, {useState} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import RectangularListItem from './RectangularListItem';
import { StatusBar } from 'expo-status-bar';
import { getMyItinsFromServer } from './actions/itin';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const data = [
  { id: 1, title: 'Spring Break', subtitle: 'Subtitle 1' },
  { id: 2, title: 'Summer Trip', subtitle: 'Subtitle 2' },
  { id: 3, title: 'Retreat', subtitle: 'Subtitle 3' },
];

const RectangularList = () => {
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

    const handleAddItem = () => {
        // const newItem = { id: items.length + 1, title: `Item ${items.length + 1}`, subtitle: 'Subtitle' };
        // setItems([...items, newItem]);
        alert("handleAddItem called...")
    };

  return (
    <SafeAreaView style={styles.container}>
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
            <RectangularListItem
                title={item.title}
                subtitle={item.description}
            />
            )}
        />
        <TouchableOpacity onPress={handleGetMyItinsFromServer} style={styles.button}>
            <Text style={styles.buttonText}>Refresh List</Text>
         </TouchableOpacity>
        <TouchableOpacity onPress={handleAddItem} style={styles.button}>
            <Text style={styles.buttonText}>Create New Itinerary</Text>
         </TouchableOpacity>
    </SafeAreaView>
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
    marginTop: 10,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default RectangularList;