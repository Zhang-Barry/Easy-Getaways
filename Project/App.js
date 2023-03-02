import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "./src/MainScreen"
import SignUp from "./src/SignUp"
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title:"Home Screen"}}
          />
        <Stack.Screen
          name="Log In"
          component={MainScreen}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}