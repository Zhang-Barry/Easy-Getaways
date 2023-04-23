import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Spinner from 'react-native-loading-spinner-overlay/lib';

import { login } from './actions/auth';
import { useSelector, useDispatch } from 'react-redux';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const authState = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (authState["isAuthenticated"] && !loading) {
    navigation.goBack();
  }

  const handleLogin = async () => {
    // handle login logic here
    // if successful, navigate to home screen
    // navigation.navigate('MainScreen');
    // navigation.navigate('MainScreen');
      
    setLoading(true);
    await login(email, password)(dispatch);
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
      <Button title="Log in" onPress={() => handleLogin()} />
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