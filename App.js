import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SubscriptionHubScreen from './SubscriptionHubScreen';
import DashboardScreen from './DashboardScreen';
import SensorLocationScreen from './SensorLocationScreen';
import AskAnythingScreen from './AskAnythingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'IoTCentral Hub' }} />
        <Stack.Screen name="SubscriptionHub" component={SubscriptionHubScreen} options={{ title: 'Subscription Hub' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Analytical Dashboard' }} />
        <Stack.Screen name="SensorLocation" component={SensorLocationScreen} options={{ title: 'Sensor Location & Health' }} />
        <Stack.Screen name="AskAnything" component={AskAnythingScreen} options={{ title: 'Ask Anything' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
