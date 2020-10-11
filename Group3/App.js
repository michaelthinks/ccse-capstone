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

//Importing different screens
import EventsList from "./Screens/EventsList";
import Home from "./Screens/Home";
import LikedEvents from "./Screens/LikedEvents.js";
import Maps from "./Screens/Maps";
import Settings from "./Screens/Settings";



// Import test data
import eventTestDataFile from './TestData/testData.json';
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

//used to set up Drawer and Stack Navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends Component {

  // Constructor for the app - this is the intialization code for the application
  // The code to retrieve the data, save it to a JSON object will be performed here
  // It will be performed when the app is first opened OR we can force refresh it (will implement later)
  // constructor(props) {
  //   super(props);
  //   this.saveEventData();
  // }

  // // This function refreshes the event (gathers data from website, stores it in asyncstorage)
  // async saveEventData() {
  //   // Note this is using dummy data for the time being!
  //   AsyncStorage.setItem('events', JSON.stringify(eventTestDataFile));
  // }

  // loadAndSaveEventData fetches the RSS data from the given URL (the CCSE events RSS feed normally)
  // It uses the react-native-xml2js library to convert the XML data into JSON data
  retrieveAndSaveEventData(dataUrl) {

    var parseString = require('react-native-xml2js').parseString;

    var jsonData = fetch(dataUrl)
      .then((response) => response.text())
      .then((response) => {
        parseString(response, (err, result) => {
            var storageResult = this.storeDataItem("events", result);
            // Debugging statements for viewing JSON data and Promise results
            // console.log(storageResult)
            // console.log(JSON.stringify(result));
        })
      });
  }
  
  // loadEventDataItem is specific for loading events
  // it strips unecessary JSON data that is imported from the RSS feed, reformats some of the
  // tags (such as tags that have an colon character in the object names, which is invalid in React),
  // and adds an event ID to the objects
  async loadEventDataItem(key) {
    var rawJsonData = await this.loadDataItem("events");
    //console.log(JSON.stringify(rawJsonData.rss.channel[0].item));
    
    var eventJsonData = rawJsonData.rss.channel[0].item;

    for (key in eventJsonData) {
      // Create a new more friend eventDate object and delete the old one
      eventJsonData[key].EventDate = eventJsonData[key]["dc:date"][0];
      delete eventJsonData[key]["dc:date"][0];

      // Create a new and more friendly object for the image url
      eventJsonData[key].EventImage = eventJsonData[key]["media:content"][0]["$"]["url"];
      delete eventJsonData[key]["media:content"];

      // Move the other objects out of an array for easier access
      eventJsonData[key].EventName = eventJsonData[key]["title"][0];
      delete eventJsonData[key]["title"][0];

      eventJsonData[key].EventDescription = eventJsonData[key]["description"][0];
      delete eventJsonData[key]["description"][0];

      eventJsonData[key].EventLink = eventJsonData[key]["link"][0];
      delete eventJsonData[key]["link"][0];

      eventJsonData[key].EventAltDate = eventJsonData[key]["pubDate"][0];
      delete eventJsonData[key]["pubDate"][0];

      // Add Liked property to the objects - default to false
      eventJsonData[key].Liked = false;

      // Add an event ID to each event
      eventJsonData[key].EventId = key.toString();

    }
    //var jsonData = rawJsonData.rss["channel"];
    //console.log(JSON.stringify(jsonData));

    return eventJsonData;
  }

  // storeEventData stores the JSON event data in AsyncStorage
  async storeDataItem(key, jsonItem) {
    try {
      // Store jsonItem data in AsyncStorage with the key events
      // This process will return a promise, which we will return to the calling function
      // to make sure the save was successful
      var resultOfStorage = await AsyncStorage.setItem(key, JSON.stringify(jsonItem));
      return resultOfStorage
    } catch (error) {
      console.log(error.message);
    }
  }

  // loadDataItem retrieves an item from AsyncStorage
  // It retrieves the item associates with whatever key is passed to it
  // This can be used for retrieving events, settings, etc.
  loadDataItem = async (key) => {
    var value;
    try {
      // Retrieve the item from Async
      value = await AsyncStorage.getItem(key)
        .then((item) => JSON.parse(item));
    }
    catch (error) {
      console.log(error.message);
    }
    if (value !== null) {
      return value;
    }
  }



  render() {
    
    this.retrieveAndSaveEventData('https://calendar.kennesaw.edu/department/college_of_computing_and_software_engineering/calendar/xml');
    
    // Store the event data in a global variable for access anywhere in the app
    global.eventsDataSource = this.loadEventDataItem("events");


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
            </Drawer.Navigator>
          </NavigationContainer>
        </ImageBackground>
      </View>
    );
  }
}
