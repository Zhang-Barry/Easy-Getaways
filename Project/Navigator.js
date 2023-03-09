import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import MainScreen from './src/MainScreen';
import SignUp from './src/SignUp';
import LoginScreen from './src/LoginScreen';
// import Main from './src/Tabs/Main';
import Itineraries from './src/Tabs/Itineraries';
import Settings from './src/Tabs/Settings';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens


//Screen names
const mainName = "Main";
const itinerariesName = "Itineraries";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function TabNavigator() {
  return (
    <Tab.Navigator
        initialRouteName={mainName}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === mainName) {
                iconName = focused ? 'home' : 'home-outline';

            } else if (rn === itinerariesName) {
                iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
                iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={mainName} component={Main} />
        <Tab.Screen name={itinerariesName} component={Itineraries} />
        <Tab.Screen name={settingsName} component={Settings} />
        <Tab.Screen name={Navigator} component={Navigator}/>

    </Tab.Navigator>
  );
}

const Navigator = () => {
    return (
      <Stack.Navigator>
          <Stack.Screen
          name="Home"
          component={Home}
          options={{title:"Home Screen"}}
          />
          <Stack.Screen
          name="Log In"
          component={LoginScreen}
          />
          <Stack.Screen
          name="Sign Up"
          component={SignUp}
          />
          <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          />
    </Stack.Navigator>
    );
  };

export default Navigator;