import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screen/HomeScreen';
import RealTimeScreen from './screen/RealTimeScreen';
import NotificationScreen from './screen/NotificationScreen';
import MyTabBars from './shared/BottomNavigation/BottomNavigation'; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <MyTabBars {...props} />} 
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" 
          component={HomeScreen}
          options={{headerShown:false}} 
        />

        <Tab.Screen 
          name="RealTime" 
          component={RealTimeScreen}
          options={{headerShown:false}} 

          />

        <Tab.Screen 
          name="Notification" 
          component={NotificationScreen} 
          options={{headerShown:false}} 

          />
      </Tab.Navigator>
    </NavigationContainer>
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
