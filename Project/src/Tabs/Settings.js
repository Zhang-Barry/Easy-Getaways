import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    SectionList,
    StatusBar,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../LoginScreen';
import SignUp from '../SignUp';

const Stack = createStackNavigator();

const mapTitleToScreenName = {
    "Login": "LoginScreen",
    "Sign Up": "SignUp",
}


const DATA = [
    {
      title: 'ACCOUNT',
      data: ['Login', 'Sign Up'],
    },
    {
      title: 'GENERAL',
    //   data: ['Notification', 'Privacy', 'Help', 'About'],
      data: [''],
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    item: {
      backgroundColor: "white",
      padding: 12,
      margin: 0.5,
    },
    header: {
      marginLeft: 15,
      marginTop: 25,
      marginBottom: 5,
      fontWeight: "bold",
      color: "gray",
    },
    title: {
      fontSize: "large",
    },
  });


let NAV;
function handleSwitchScreen(screenName) {
    NAV.navigate(screenName);
}
function SettingsMenu() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.item} onPress={() => handleSwitchScreen(mapTitleToScreenName[item])}>
                        <Text style={styles.title}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
                <View style={{margin: 25}}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default function Settings({ navigation }) {
    NAV = navigation;
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Settings" component={SettingsMenu} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    );
}