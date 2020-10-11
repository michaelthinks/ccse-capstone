import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Button, SafeAreaView, TouchableWithoutFeedback, Image, Text, View, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { drawerContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { globalStyles } from '../styles/styles.js';


export default class Home extends Component {
  
  render() {
  
      return (
        /* Background for Home page using the Kennesaw JPG image */
        /* SafeAreaView must be used in order to deal with the notch on iOS 
        devices - it does not affect Android and just acts like a normal view */
        <SafeAreaView style={globalStyles.homePageContainer}>
          <StatusBar style="auto" hidden={false} />
          <ImageBackground source= {require( "../assets/KSU.jpg" )} style={{ width: '100%', height: '100%'}}>
            <View style={globalStyles.headerContainer}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                                <View style={globalStyles.homeMenuIcon}>
                                    <Image source={require('../assets/menu.png')} />
                                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* This view contains the navigation buttons on the home page */}
            <View style={globalStyles.homePageContentContainer}>
              <View style={globalStyles.homePageButtonContainer}>
                  <View style={globalStyles.homePageButton}>
                      {/* Note about navigate - you must use the NAME you gave to the screen in App.js, NOT the actual file name */}
                      <Button
                          style={globalStyles.homePageButton}
                          onPress={() => this.props.navigation.navigate('Events')}
                          title="Events"
                          color="#febc11"
                          accessibilityLabel="This button will navigate to the events page." 
                      />
                  </View>
                  <View style={globalStyles.homePageButton}>
                      {/* Note about navigate - you must use the NAME you gave to the screen in App.js, NOT the actual file name */}
                      <Button
                          style={globalStyles.homePageButton} 
                          onPress={() => this.props.navigation.navigate('Liked Events')}
                          title="Liked Events"
                          color="#febc11"
                          accessibilityLabel="This button will navigate to the Liked Events page." 
                      />
                  </View>
                  <View style={globalStyles.homePageButton}>
                      {/* Note about navigate - you must use the NAME you gave to the screen in App.js, NOT the actual file name */}
                      <Button
                          style={globalStyles.homePageButton} 
                          onPress={() => this.props.navigation.navigate('Campus Maps')}
                          title="Campus Maps"
                          color="#febc11"
                          accessibilityLabel="This button will navigate to the campus maps page." 
                      />
                  </View>
                </View>
            </View>
         </ImageBackground>
        </SafeAreaView>
      );
    }
  }