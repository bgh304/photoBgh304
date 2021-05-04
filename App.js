import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Views/MainScreen';
import TakePhoto from './Views/TakePhoto';
import SavePhoto from './Views/SavePhoto';
import WatchPhoto from './Views/WatchPhoto';
import MapScreen from './Views/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Photoz n Data' component={MainScreen} />
        <Stack.Screen name='Take photo' component={TakePhoto} />
        <Stack.Screen name='Save photo' component={SavePhoto} />
        <Stack.Screen name='Watch photo' component={WatchPhoto} />
        <Stack.Screen name='Map location' component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}