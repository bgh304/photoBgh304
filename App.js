import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Views/MainScreen';
import TakePhoto from './Views/TakePhoto';
import SavePhoto from './Views/SavePhoto';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='TakePhoto' component={TakePhoto} />
        <Stack.Screen name='SavePhoto' component={SavePhoto} />
      </Stack.Navigator>
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
