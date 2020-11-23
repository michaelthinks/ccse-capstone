// App.js is the main starting point for the application
// This file calls the main startup procedures (located in AppFunctions.js) and makes sure the user has 
// the correct permissions, loads data from persistent storage, checks for new events, checks for liked events, etc.
// It also handles setting up the navigation drawer.
// Once this loads, it displays Home.js (the first item in the Drawer Navigator below)

import React, { Component } from "react";
import {
  View,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { globalStyles } from "./styles/styles.js";

// Import AppFunctions library
import AppFunc from "./Scripts/AppFunctions.js"

//Import the different screens
import EventsList from "./Screens/EventsList";
import Home from "./Screens/Home";
import LikedEvents from "./Screens/LikedEvents.js";
import Maps from "./Screens/Maps";
import Settings from "./Screens/Settings";
import SocialMediaTwitter from "./Screens/SocialMediaTwitter";
import SocialMediaFacebook from "./Screens/SocialMediaFacebook";
import CcseHomepage from "./Screens/CcseHomepage";
import EventDetails from "./Screens/EventDetails";

// Setup navigation drawer
const Drawer = createDrawerNavigator();

export default class App extends Component {

  // Import app functions file that contains global app functions
  AppFunctions = new AppFunc();

  render() {

    // Check notification permissions
    this.AppFunctions.getPermissions();

    // Load settings switches into global variable
    this.AppFunctions.loadSettingsState();

    // Check the event data and save it if necessary (this function handles checking to see if it has been updated as well)
    // It retrieves data from the given URL - if the URL for some reason changes in the future it can be updated here, but the 
    // application is specifically tailored to the data format that this source provides. If for some reason the data source is change 
    // in the future (for instance, from RSS to raw XML or from RSS to JSON) then it will break the app and this function 
    // along with formatEventData, both in AppFunctions.js, will need to be updated to support it.
    //
    // If the URL is updated, make sure to update it for in the updateEvents function in EventsList.js!
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
              <Drawer.Screen name="Event Details" component={EventDetails} options={{ title: '' }} />
            </Drawer.Navigator>


          </NavigationContainer>
        </ImageBackground>

      </View>
    );
  }
}
