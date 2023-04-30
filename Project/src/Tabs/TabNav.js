import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Home from './Home';
import Places from './Places'
import Itineraries from './Itineraries';
import Settings from './Settings';

//Screen names
const homeName = "Home";
const placesName = "Places";
const itinerariesName = "Itineraries";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === placesName) {
              iconName = focused ? 'map' : 'map-outline';

            } else if (rn === itinerariesName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 0, fontSize: 10 },
          tabBarStyle: { padding: 10, height: 80 }
        })}>

        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={placesName} component={Places} options={{title: "Saved Places"}}/>
        <Tab.Screen name={itinerariesName} component={Itineraries} options={{headerShown: false}}/>
        <Tab.Screen name={settingsName} component={Settings} options={{headerShown: false}}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;