import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen'
import PersonScreen from '../screens/PersonScreen'
import SearchScreen from '../screens/SearchScreen'
import MovieScreen from '../screens/MovieScreen'

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Movie' component={MovieScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Person' component={PersonScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Search' component={SearchScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})