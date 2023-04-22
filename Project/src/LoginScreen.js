import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { login } from './actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-web';

const LoginScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const authState = useSelector(state => state.auth);
  if (authState["isAuthenticated"]) {
    navigation.goBack();
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (dispatch) => {
    // handle login logic here
    // if successful, navigate to home screen
    // navigation.navigate('MainScreen');
    // navigation.navigate('MainScreen');
  
    const action = await login(email, password)();
    if (action) dispatch(action);
  };

  return (
    <View style={styles.container}>
      <View style={{marginLeft: 40, marginBottom: 20, alignSelf: 'flex-start'}}>
        <Text style={{fontSize:50}}>
          Login
        </Text>
        <Text>
          Login with your credentials.
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log in" onPress={() => handleLogin(dispatch)} />
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

export default LoginScreen;