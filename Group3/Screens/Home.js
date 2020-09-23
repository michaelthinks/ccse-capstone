import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Image, Text, View, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { drawerContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { globalStyles } from '../styles/styles.js';
import { EventsList } from '../Screens/EventsList.js';

export default class Home extends Component {
  
  render() {
  
      return (
        /* Background for Home page using the Kennesaw JPG image */
        <View style={globalStyles.container}>
          <ImageBackground source= {require( "../assets/KSU.jpg" )} style={{ width: '100%', height: '100%'}}>
  
            <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                              <View style={globalStyles.homeMenuIcon}>
                                  <Image source={require('../assets/menu.png')} />
                              </View>
            </TouchableWithoutFeedback>
            {/* I originally used this view style to set up a link near the middle bottom of the page */}
            <View style={globalStyles.bottomPage}>
                {/* BLANK FOR RIGHT NOW */}
            </View>
         </ImageBackground>
        </View>
      );
    }
  }