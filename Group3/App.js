import { StatusBar } from "expo-status-bar";
import React, { Component, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
  AsyncStorage, Alert
} from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { globalStyles } from "./styles/styles.js";

// Import AppFunctions library
import AppFunc from "./Scripts/AppFunctions.js"

//Importing different screens
import EventsList from "./Screens/EventsList";
import Home from "./Screens/Home";
import LikedEvents from "./Screens/LikedEvents.js";
import Maps from "./Screens/Maps";
import Settings from "./Screens/Settings";
import SocialMediaTwitter from "./Screens/SocialMediaTwitter";
import SocialMediaFacebook from "./Screens/SocialMediaFacebook";
import CcseHomepage from "./Screens/CcseHomepage";


// Import test data
import eventTestDataFile from './TestData/testData.json';
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

//used to set up Drawer and Stack Navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends Component {

  // Import app functions file that contains global app functions
  AppFunctions = new AppFunc();

  render() {
    // Check the event data and save it if necessary (this function handles checking to see if it has been updated as well)
    this.AppFunctions.retrieveAndSaveEventData('https://calendar.kennesaw.edu/department/college_of_computing_and_software_engineering/calendar/xml');

    // Check to see if liked events exists in asyncstorage - if it doesn't created
    this.AppFunctions.checkLikedEvents();

    return (
      <View style={globalStyles.container}>
        <ImageBackground
          source={require("../Group3/assets/KSU.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          {/* This block of code is used to set set up the drawers on the main page of the app
              and link each screen together. */}
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Events" component={EventsList} />
              <Drawer.Screen name="Liked Events" component={LikedEvents} />
              <Drawer.Screen name="Campus Maps" component={Maps} />
              <Drawer.Screen name="Settings" component={Settings} />
              <Drawer.Screen name="CCSE @ KSU.edu" component={CcseHomepage} />
              <Drawer.Screen name="CCSE on Twitter" component={SocialMediaTwitter} />
              <Drawer.Screen name="CCSE on Facebook" component={SocialMediaFacebook} />
            </Drawer.Navigator>
          </NavigationContainer>
        </ImageBackground>
      </View>
    );
  }
}
