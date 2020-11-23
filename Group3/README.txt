\/ Use following to install the Navigation packages: \/
========================================================

// Dependencies used within the application
// Each of these will need to be installed using npm install *packagenamebelow* in order to run the project
react-native-webview
react-native-xml2js
@react-native-community/async-storage
expo-calendar
expo-permissions
expo-notifications
expo-constants

=========================================================
***All data is stored in JSON format***

All of the available events are available in the following global variable:
global.eventDataSource

All events are stored in persistent AsyncStorage under the following key:
events

All of the events that have been liked by the user are available the following global variable:
global.likedEvents

All liked events are stored in persistent AsyncStorage under the following key:
likedEvents

The settings are accessible in using the following global variable:
global.settings

The settings are stored in persistent AsyncStorage under the following key:
settings