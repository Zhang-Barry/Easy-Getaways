import React, { useState } from 'react';
import {Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // handle login logic here
    // if successful, navigate to home screen
    navigation.navigate('Success');
  };

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder="Email"
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
      <TextInput
          style={styles.input}
          placeholder="Re-Enter Password"
          value={password}
          onChangeText={setPassword}          //Change this to verify same password
          secureTextEntry
      />
      <Button title="Sign Up" onPress={handleLogin} />
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