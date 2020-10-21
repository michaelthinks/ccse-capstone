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

  // loadAndSaveEventData fetches the RSS data from the given URL (the CCSE events RSS feed normally)
  // It uses the react-native-xml2js library to convert the XML data into JSON data
  async retrieveAndSaveEventData(dataUrl) {
    // Key to identify object in AsyncStorage
    var eventsKey = "events";
    var cacheKey = "cache"

    var events;
    var cache;

    // Create our XML2JS parser to parse the RSS/XML feed
    var parseString = require('react-native-xml2js').parseString;

    // fetch the data and store the data in cache
    var jsonData = fetch(dataUrl)
      .then((response) => response.text())
      .then((response) => {
        parseString(response, (err, result) => {
          this.storeDataItem(cacheKey, result);
            // Debugging statements for viewing JSON data and Promise results
            // console.log(storageResult)
        })
      });

    // Load cache items from cache into cache variable
    this.loadDataItem(cacheKey).then((data) => { cache = data });

    // Attempt to load event items - this will be used in the next if/else statement to see if we need to reload the event data
    //this.loadDataItem(eventsKey).then((data) => { events = data });
    this.loadDataItem(eventsKey).then((data) => {
        // If no data currently exists in Async, then load data in Async under events key (this is the apps first load), then populate data for the first time
        console.log(JSON.stringify(global.eventsDataSource));
        alert(data);
        if (data._55 === undefined || data._55 === null) {
          // Format the data and store in our global variable
          global.eventsDataSource = this.formatEventData(cache);

          
          // Store the data in AsyncStorage
          this.storeDataItem(eventsKey, global.eventsDataSource);
        }

        // If there is already data stored, check to see if there have been any updates to the data
        else {
          // Flag to let us know if data has changed
          var dataChanged = false;

          for (key in global.eventsDataSource) {
            // Check to see if the event names are equal for each event - if they aren't the data has changed
            if (global.eventsDataSource[key].EventName !== cache[key].EventName) {
              dataChanged = true;    
            }
          }

          // If data has changed, overwrite the event data in AsyncStorage with the new data
          if (dataChanged) {
            // Format the data and store in our global variable
            global.eventsDataSource = this.formatEventData(cache);


            // Store the data in AsyncStorage
            this.storeDataItem(eventsKey, global.eventsDataSource);
          }
          else {
            // Do nothing
            // Debug alert
            alert("Data not updated");
          }
        }

      });
    
    

  }
  
  // formatEventData is specific for loading events
  // it strips unecessary JSON data that is imported from the RSS feed, reformats some of the
  // tags (such as tags that have an colon character in the object names, which is invalid in React),
  // and adds an event ID to the objects
  async formatEventData(rawJsonData) {
    //var rawJsonData = await this.loadDataItem(theKey);
    //console.log(JSON.stringify(rawJsonData.rss.channel[0].item));
    
    var eventJsonData = rawJsonData.rss.channel[0].item;

    for (key in eventJsonData) {
      // Create a new more friend eventDate object and delete the old one
      eventJsonData[key].EventDate = eventJsonData[key]["dc:date"][0];
      delete eventJsonData[key]["dc:date"];

      // Create a new and more friendly object for the image url
      eventJsonData[key].EventImage = eventJsonData[key]["media:content"][0]["$"]["url"];
      delete eventJsonData[key]["media:content"];

      // Move the other objects out of an array for easier access
      eventJsonData[key].EventName = eventJsonData[key]["title"][0];
      delete eventJsonData[key]["title"];

      eventJsonData[key].EventDescription = eventJsonData[key]["description"][0];
      delete eventJsonData[key]["description"];

      eventJsonData[key].FriendlyDescription = eventJsonData[key]["EventDescription"].replace(/(<([^>]+)>)/gi, "");

      eventJsonData[key].EventLink = eventJsonData[key]["link"][0];
      delete eventJsonData[key]["link"];

      eventJsonData[key].EventAltDate = eventJsonData[key]["pubDate"][0];
      delete eventJsonData[key]["pubDate"];

      // Add an event ID to each event
      eventJsonData[key].EventId = key;

    }
    //var jsonData = rawJsonData.rss["channel"];
    //console.log(JSON.stringify(eventJsonData));

    return eventJsonData;
  }

  // storeEventData stores the JSON event data in AsyncStorage
  async storeDataItem(key, jsonItem) {
    try {
      // Store jsonItem data in AsyncStorage with the key events
      // This process will return a promise, which we will return to the calling function
      // to make sure the save was successful
      var resultOfStorage = await AsyncStorage.setItem(key, JSON.stringify(jsonItem));
      return resultOfStorage;
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
