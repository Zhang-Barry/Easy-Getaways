import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import SelectDropdown from 'react-native-select-dropdown'

const countries = ["United States", "Canada"]
const states = {
  "United States": ["NY", "TX", "CA"],
  "Canada": ["Ontario"],
}
const cities = {
  "United States": {
    "NY": ["New York", "Albany", "Buffalo", ],
    "TX": ["Austion", "Dallas", "Fort Worth", "San Antonio"],
    "CA": ["Los Angeles", "San Francisco"]
  },
  "Canada": {
    "Ontario": ["Toronto"],
  }
}


const EditItinScreen = ( {route, navigation} ) => {
  const itin = route.params.itin;
  // const dispatch = useDispatch()
  
  const [title, setTitle] = useState(itin.title);
  const [description, setDescription] = useState(itin.description);
  const [country, setCountry] = useState(itin.country);
  const [state, setState] = useState(itin.state);
  const [city, setCity] = useState(itin.city);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [password2, setPassword2] = useState('');
  // const [loading, setLoading] = useState(false);
  // const navigation = useNavigation();

  // const authState = useSelector(state => state.auth);
  // if (authState["isAuthenticated"] && !loading) {
  //   navigation.goBack();
  // }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Text>{JSON.stringify(route.params.itin)}</Text> */}
        
        {/* <Spinner
          visible={loading}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        /> */}
        <Text style={styles.inputTitle}>Title</Text>
        <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
        />
        <Text style={styles.inputTitle}>Description</Text>
        <TextInput
            editable
            multiline
            maxLength={256}
            numberOfLines={4}
            style={ {...styles.input, height: 100} }
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
        />

      <Text style={styles.inputTitle}>Itinerary Country</Text>
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          setCountry(selectedItem)
        }}
      />
      <Text style={styles.inputTitle}>Itinerary State/Province</Text>
      <SelectDropdown
        data={ (country in countries) ? state[country] : [] }
        onSelect={(selectedItem, index) => {
          setState(selectedItem)
        }}
      />


        <TextInput>{"\n\n"}</TextInput>
        <Button title="Submit"/>
        <View style={{height: 50}}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'left',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    // height: '10%',
    marginVertical: 4,
    padding: 15,
    backgroundColor:"gainsboro",
    // borderWidth: 1,
    borderRadius: 10,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  }
});

export default EditItinScreen;