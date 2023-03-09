import React, {useState} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import RectangularListItem from './RectangularListItem';
import { StatusBar } from 'expo-status-bar';

const data = [
  { id: 1, title: 'Spring Break', subtitle: 'Subtitle 1' },
  { id: 2, title: 'Summer Trip', subtitle: 'Subtitle 2' },
  { id: 3, title: 'Retreat', subtitle: 'Subtitle 3' },
];

const RectangularList = () => {

    const [items, setItems] = useState(data);

    const handleAddItem = () => {
        const newItem = { id: items.length + 1, title: `Item ${items.length + 1}`, subtitle: 'Subtitle' };
        setItems([...items, newItem]);
    };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
            <RectangularListItem
                title={item.title}
                subtitle={item.subtitle}
            />
            )}
        />
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