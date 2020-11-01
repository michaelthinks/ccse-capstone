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

export default class AppFunctions extends Component {
  // loadAndSaveEventData fetches the RSS data from the given URL (the CCSE events RSS feed normally)
  // It uses the react-native-xml2js library to convert the XML data into JSON data
  async retrieveAndSaveEventData(dataUrl) {
    // Key to identify object in AsyncStorage
    var eventsKey = "events";
    var cacheKey = "cache";

    // Import existing events data - if none exists, set to null/undefined
    var events = await this.loadDataItem(eventsKey);
    var cache;

    // Create our XML2JS parser to parse the RSS/XML feed
    var parseString = require('react-native-xml2js').parseString;

    // fetch the data and store the data in cache
    var jsonData = await fetch(dataUrl)
      .then((response) => response.text())
      .then((response) => {
        parseString(response, (err, result) => {
          this.storeDataItem(cacheKey, result);
            // Debugging statements for viewing JSON data and Promise results

          cache = this.formatEventData(result);
        })
      });

    // Compare store events to the new cache and see if the cache has is updated (meaning the website has been updated)
    if (JSON.stringify(cache) === JSON.stringify(events)) {
      // Events haven't been updated - store events in the global varible

      // Assign events to the global events variable for use throughout the app
      global.eventsDataSource = events;
    }
    else {
      // Events have been updated

      // Assign the new cache to events
      events = cache;

      // Save new events to AsyncStorage
      await this.storeDataItem(eventsKey, events);

      // Save new events to global events variable for use throughout app
      global.eventsDataSource = events;
    }

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
  async loadDataItem(key) {
    var value;
    try {
      // Retrieve the item from Async
      value = await AsyncStorage.getItem(key)
        .then((item) => JSON.parse(item));
    }
    catch (error) {
      console.log(error.message);
      return Promise.resolve(undefined);
    }
    if (value !== null) {
      return Promise.resolve(value);
    }
  }

  // This function checks to see if a list of liked events exists in asyncstorage - if it doesn't, it creates it
  async checkLikedEvents() {
    this.loadDataItem("likedEvents")
    .then((likedEventsCheck) => {
        // Check the likedEventsCheck variable - if it doesn't exist, it's never been created, so create it
        if (likedEventsCheck == undefined || likedEventsCheck == null) {
          console.log("no logged events, creating it");
          // Create a new data item in AsyncStorage - just assign it an empty JSON object
          this.storeDataItem("likedEvents", { "liked":[] })

          // Assign undefined JSON object to global likedEvents variable for access throughout app
          global.likedEvents = { "liked":[] };
        }
        else {
          console.log("liked events exists");
          // likedEvents already exists - load it into a global variable for use within the app
          global.likedEvents = likedEventsCheck;
        }
    });
  }


  // formatEventData is specific for loading events
  // it strips unecessary JSON data that is imported from the RSS feed, reformats some of the
  // tags (such as tags that have an colon character in the object names, which is invalid in React),
  // and adds an event ID to the objects
  formatEventData(rawJsonData) {
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
}