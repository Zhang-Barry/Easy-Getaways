import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';


const EditItinScreen = ( {route, navigation} ) => {
  const itin = route.params.itin;
  // const dispatch = useDispatch()
  
  const [title, setTitle] = useState(itin.title);
  const [description, setDescription] = useState(itin.description);
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

      <Text style={styles.inputTitle}>Location</Text>
      <TextInput
            style={styles.input}
            placeholder="City"
            value={title}
            onChangeText={setTitle}
        />
      <TextInput
            style={styles.input}
            placeholder="State"
            value={title}
            onChangeText={setTitle}
        />
      <TextInput
            style={styles.input}
            placeholder="Country"
            value={title}
            onChangeText={setTitle}
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