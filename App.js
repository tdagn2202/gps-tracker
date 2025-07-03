import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import DynamicIcon from './shared/Icons/DynamicIcon';
import MyTabBars from './shared/BottomNavigation/BottomNavigation';
import fonts from './constants/fonts';

import HomeScreen from './screen/HomeScreen';
import LocationHistoryScreen from './screen/LocationHistoryScreen';
import NotificationScreen from './screen/NotificationScreen';
import ReportScreen from './screen/ReportScreen';
import LastUpdatedTimeScreen from './screen/LastUpdatedTimeScreen';
import AddNewDeviceScreen from './screen/AddNewDeviceScreen';
import MapDetailScreen from './screen/MapDetailScreen';
import SearchMapScreen from './screen/SearchMapScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const createHeaderOptions = (title, navigationTarget = 'Home') => ({ navigation }) => ({
  headerShown: true,
  headerTitle: () => (
    <View style={{ paddingHorizontal: 16 }}>
      <Text
        style={{
          color: '#7e7e7e',
          fontSize: 18,
          fontFamily: fonts.HelveticaNeueMedium,
        }}
      >
        {title}
      </Text>
    </View>
  ),
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#fff',
    elevation: 0, 
    shadowOpacity: 0, 
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    height: 90,
    paddingTop: 20,
  },
  headerShadowVisible: false,
  headerLeftContainerStyle: {
  paddingLeft: 8, 
  paddingTop: 4,
},
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigationTarget === 'goBack' 
        ? navigation.goBack() 
        : navigation.navigate(navigationTarget)}
      style={{ marginLeft: 16 }}
    >
      <View style={styles.squareIcon}>
        <View style={styles.iconContainer}>
          <DynamicIcon
            type="MaterialIcons"
            name="keyboard-arrow-left"
            size={24}
            color="#7e7e7e"
          />
        </View>
      </View>
    </TouchableOpacity>
  ),
});



const TabNavigator = (getHeaderOptions) => () => (
  <Tab.Navigator tabBar={(props) => <MyTabBars {...props} />}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="History"
      component={LocationHistoryScreen}
      options={getHeaderOptions('History')}
    />

    <Tab.Screen
      name="Report"
      component={ReportScreen}
      options={getHeaderOptions('Report')}
    />

  </Tab.Navigator>
);


export default function App() {
  const [fontsLoaded] = useFonts({
    [fonts.HelveticaNeueMedium]: require('./assets/fonts/HelveticaNeueMedium.otf'),
    [fonts.HelveticaNeueBold]: require('./assets/fonts/HelveticaNeueBold.otf'),
    [fonts.HelveticaNeueBlackItalic]: require('./assets/fonts/HelveticaNeueBlackItalic.otf'),
    [fonts.HelveticaNeueMediumItalic]: require('./assets/fonts/HelveticaNeueMediumItalic.otf'),
  });

  if (!fontsLoaded) return null;

  const getHeaderOptions = (title, target) => createHeaderOptions(title, target);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator(getHeaderOptions)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LastUpdatedTimeScreen"
          component={LastUpdatedTimeScreen}
          options={getHeaderOptions('Last Updated', 'goBack', {paddingLeft:16})}
        />

        <Stack.Screen
          name="AddNewDeviceScreen"
          component={AddNewDeviceScreen}
          options={getHeaderOptions('Add New Device', 'goBack')}
        />

        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={getHeaderOptions('Notification', 'goBack')}
        />

        <Stack.Screen
          name="MapDetailScreen"
          component={MapDetailScreen}
          options={({ route, navigation }) => ({
            headerShown: true,
            headerTitle: () => (
              <View style={{ paddingHorizontal: 16 }}>
                <Text
                  style={{
                    color: '#7e7e7e',
                    fontSize: 18,
                    fontFamily: fonts.HelveticaNeueMedium,
                  }}
                >
                  {route.params?.name || 'Map Detail'}
                </Text>
              </View>
            ),
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
              elevation: 0,
              shadowOpacity: 0,
              height: 90,
              paddingTop: 20,
            },
            headerShadowVisible: false,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              paddingTop: 4,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 16 }}
              >
                <View style={styles.squareIcon}>
                  <View style={styles.iconContainer}>
                    <DynamicIcon
                      type="MaterialIcons"
                      name="keyboard-arrow-left"
                      size={24}
                      color="#7e7e7e"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ),
          })}
        />


        <Stack.Screen
          name="SearchMapScreen"
          component={SearchMapScreen}
          options={{
            presentation: 'modal', 
            headerShown: false,     
          }}
        />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  squareIcon: {
    borderRadius: 10,
    padding: 6,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
