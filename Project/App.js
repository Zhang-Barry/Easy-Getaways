import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import RectangularList from './src/RectangularList';
import Settings from './src/Tabs/Settings';
import TabNav from './src/Tabs/TabNav';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator';

export default function App() {
  return (
    // <TabNav/>
    // <RectangularList/>
    <TabNav/>   // Uncomment this for when logged in
    
    // <NavigationContainer>      //
    //   <Navigator/>             //  Uncomment for login
    // </NavigationContainer>     //
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

