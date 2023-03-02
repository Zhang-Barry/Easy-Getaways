import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigator from './Navigator'
import React from 'react';
import MainScreen from './src/MainScreen'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator/>
      {/* <MainScreen/> */}
    </NavigationContainer>
  );
}