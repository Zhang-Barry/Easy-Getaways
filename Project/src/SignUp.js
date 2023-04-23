import React, { useState } from 'react';
import {Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './actions/auth';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const SignUp = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const authState = useSelector(state => state.auth);
  if (authState["isAuthenticated"] && !loading) {
    navigation.goBack();
  }

  const handleRegistration = async () => {
    setLoading(true);
    await register(username, email, password, password2)(dispatch);
    setLoading(false);
  };

  return (
    <View style={styles.container}>

        <Spinner
          visible={loading}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />

      <View style={{marginLeft: 40, marginBottom: 20, alignSelf: 'flex-start'}}>
        <Text style={{fontSize:50}}>
          Signup
        </Text>
        <Text>
          Create a new account.
        </Text>
      </View>

      <TextInput
          style={styles.input}
          placeholder="Username *"
          value={username}
          onChangeText={setUsername}
      />
      <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
      />
      <TextInput
          style={styles.input}
          placeholder="Password *"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
      />
      <TextInput
          style={styles.input}
          placeholder="Re-Enter Password *"
          value={password2}
          onChangeText={setPassword2}          //Change this to verify same password
          secureTextEntry
      />
      <Button title="Register" onPress={() => handleRegistration()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default SignUp;