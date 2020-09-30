import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { globalStyles } from './styles/styles.js';

//Importing different screens
import EventsList from './Screens/EventsList';
import Home from './Screens/Home';
import Settings from './Screens/Settings';

//used to set up Drawer and Stack Navigators
const Drawer = createDrawerNavigator ();
const Stack = createStackNavigator ();

export default class App extends Component {

  render() {

    return (
      <View style={globalStyles.container}>
        <ImageBackground source= {require( "../Group3/assets/KSU.jpg" )} style={{ width: '100%', height: '100%'}}>

          {/* This block of code is used to set set up the drawers on the main page of the app
              and link each screen together. */} 
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name = "Home" component = {Home} />
              <Drawer.Screen name = "Events" component = {EventsList} />
              <Drawer.Screen name = "Settings" component = {Settings} />
            </Drawer.Navigator>
          </NavigationContainer> 

       </ImageBackground>
      </View>
    );
  }
}


