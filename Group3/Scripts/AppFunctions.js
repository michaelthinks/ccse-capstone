// Released under the MIT License - see LICENSE.txt
//
// AppFunctions.js contains the core functions used by the app. Most functions in this file 
// related to data retrieval, data storage, sends and cancelling notifications, checking the data 
// sources, and other various functions.
//
// This file along with EventsList.js serve as the 2 main sources for the functions that control the app
// EventsList.js contains functions related more to event rendering.

import { Component, useCallback } from "react";
import {
  Linking, Alert, Platform
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import * as Calendar from 'expo-calendar';
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from 'expo-constants';

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

      // Notify the user that new events are available
      // Check to see if notifications are enabled first
      if (global.settings.newEvents) {
        this.sendNotification("New Events Available", "New CCSE Events have been created!");
      }
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
          // Create a new data item in AsyncStorage - just assign it an empty JSON object
          this.storeDataItem("likedEvents", { "liked":[] })

          // Assign undefined JSON object to global likedEvents variable for access throughout app
          global.likedEvents = { "liked":[] };
        }
        else {
          // likedEvents already exists - load it into a global variable for use within the app
          global.likedEvents = likedEventsCheck;
        }
    });
  }

  // This function checks for Calendar permissions
  async calendarPermissions() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
    }
  }

  // formatEventData is specific for loading events
  // it strips unecessary JSON data that is imported from the RSS feed, reformats some of the
  // tags (such as tags that have an colon character in the object names, which is invalid in React),
  // and adds an event ID to the objects
  formatEventData(rawJsonData) {
    // Select the correct item in the RSS data
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
    // Return the formatted data
    return eventJsonData;
  }

  // OpenURL opens a given URL in an external browser
  // It does not support deep links like slack://, twitter://, etc.
  OpenURL({ url, children }) {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  };

  // Notification functions
  // 
  // Information:
  // https://gist.github.com/VeraZab/c3f13d51588bcfdf6799da65decf26fa
  // https://dev.to/technoplato/show-notifications-in-foreground-on-expo-ios-application-4mg6#:~:text=Show%20Notifications%20in%20Foreground%20on%20Expo%20iOS%20Application!!,-%23javascript%20%23expo%20%23&text=2)%20Copy%20the%20token%20that,when%20your%20app%20is%20foregrounded.
  // 
  // We need to ask for Notification permissions for ios devices - not relevant on Android devices
  async getPermissions() {  
    // Check if the device is runing ios
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (Constants.isDevice && status === 'granted')
        console.log('Notification permissions granted.');
    }
    else {
      // Do nothing - user has an Android device
    }
  }

  // Sends an immediate notification to the user
  sendNotification(nTitle, nBody) {
    Notifications.scheduleLocalNotificationAsync(
      {
        title: nTitle,
        body: nBody,
      },
      {
        time: new Date().valueOf() + 2,
      },
    );
  }

  // This schedules a notification for the future
  // Returns the notification ID so it can be stored in case we need to delete it later
  async scheduleNotification(nTitle, nBody, nTime) {
    // Check to see if user has notifications enabled for liked events
    if (global.settings.likedEvents == true) {
       await Notifications.scheduleLocalNotificationAsync(
        {
          title: nTitle,
          body: nBody,
        },
        {
          // Schedule the notifications 30 minutes before the event happens
          time: nTime - 900,
        }
      )
      .then((id) => { return id });

    }
    // If user has notifications turned off, return undefined
    else {
      return 0;
    }
  }

  // Loads the settings state variable from AsyncStorage into global variable for access across app
  loadSettingsState() {
    this.loadDataItem("settings")
      .then((data) => {
        if (data == undefined || data == "" || data === undefined) {
          // Assign Default Settings Values
          global.settings = {
            likedEvents: true,
            newEvents: true,
          }
        }
        else {
          // Load settings into global settings variable
          global.settings = data;
        }
      });
  }

  // Cancels a single notification
  cancelNotification(notifId) {
    Notifications.cancelScheduledNotificationAsync(notifId);
  }

  // Cancels all scheduled future notifications
  cancelAllNotifications() {
    Notifications.cancelAllScheduledNotificationsAsync();
  }
}