import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    SectionList,
    StatusBar,
    TouchableOpacity,
  } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../LoginScreen';
import SignUp from '../SignUp';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import authReducer from '../reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';


const Stack = createStackNavigator();

const mapTitleToScreenName = {
    "Login": "LoginScreen",
    "Sign Up": "SignUp",
    "Privacy": "Home",
    "Notification": "Home",
}

const getListData = (authState) => {
  if (!authState["isAuthenticated"]) {
    return [
      {
        title: 'ACCOUNT',
        data: ['Login', 'Sign Up'],
      },
      {
        title: 'GENERAL',
        data: ['Privacy', 'Notification'],
      }
    ]
  } else {
    return [
      {
        title: 'ACCOUNT',
        data: ['__USERINFO__', 'Logout'],
      },
      {
        title: 'GENERAL',
        data: ['Privacy', 'Notification'],
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
      fontSize: 18,
      marginLeft: 5,
    },
  });


let NAV;
function handleSwitchScreen(screenName) {
    NAV.navigate(screenName);
}
function SettingsMenu() {
  const authState = useSelector(state => state.auth);
  
  const dispatch = useDispatch()
  const handleLogOut = () => {
   logout()(dispatch);
  }

  return (
        <SafeAreaView style={styles.container}>
                <SectionList
                    sections={getListData(authState)}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => (

                      (item == "__USERINFO__") ? 
                          <TouchableOpacity style={styles.item}>
                          <Ionicons name={"person-outline"} size={50} color={"black"} />
                          <Text style={styles.title}>{ authState["user"]["username"] }</Text>
                          </TouchableOpacity> 
                        :

                        (item == "Logout") ? 
                          <TouchableOpacity style={styles.item} onPress={() => handleLogOut()}>
                          <Text style={styles.title}>{item}</Text>
                          </TouchableOpacity> 
                        :
                          <TouchableOpacity style={styles.item} onPress={() => handleSwitchScreen(mapTitleToScreenName[item])}>
                          <Text style={styles.title}>{item}</Text>
                          </TouchableOpacity> 

                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
                <View style={{margin: 25}}/>
        </SafeAreaView>
    )
}

export default function Settings({ navigation }) {
  NAV = navigation;
  return (
      <Stack.Navigator initialRouteName="SettingsRoot">
          <Stack.Screen name="Settings" component={SettingsMenu}/>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
  );
}