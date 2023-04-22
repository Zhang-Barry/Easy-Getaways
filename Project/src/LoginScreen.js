import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { login } from './actions/auth';
// import { useDispatch } from 'react-redux';

const LoginScreen = () => {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // handle login logic here
    // if successful, navigate to home screen
    // navigation.navigate('MainScreen');
    // navigation.navigate('MainScreen');

    // dispatch(login(email, password)());
    login(email, password)();
  };

  return (
    <View style={styles.container}>
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
      <Button title="Log in" onPress={handleLogin} />
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