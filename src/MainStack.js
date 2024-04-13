// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Screen/Home';
import MovieDetailsScreen from './Screen/MovieDetail';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home (Aditya Phogat)'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{title: 'Movie Details (Mahek)'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
