import { useState } from 'react';
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
import { increment } from '../actions/testAction'

// import authReducer from '../reducers/authReducer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';


const Stack = createStackNavigator();

const mapTitleToScreenName = {
    "Login": "LoginScreen",
    "Sign Up": "SignUp",
}

const getListData = (authState) => {
  if (!authState["isAuthenticated"]) {
    return [
      {
        title: 'ACCOUNT',
        data: ['Login', 'Sign Up'],
      }
    ]
  } else {
    return [
      {
        title: 'ACCOUNT',
        data: [`You're currently logged in!\nUserID: ${authState["user"]}`, 'Logout'],
      }
    ]
  }
}

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
  const authState = useSelector(state => state.auth);
  return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <SectionList
                    sections={getListData(authState)}
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
  const authState = useSelector(state => state.auth);
  console.log(authState);
  NAV = navigation;
  return (
      <Stack.Navigator initialRouteName="SettingsRoot">
          <Stack.Screen name="Settings" component={SettingsMenu}/>
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
  );
}