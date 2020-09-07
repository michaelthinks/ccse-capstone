import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, SafeAreaView, Image, Platform } from 'react-native';

export default function App() {
  return (
    // SafeAreaView is iOS specific and doesn't do anything on Android. It keeps the main 
    // View are below the notch on an iPhone
    <SafeAreaView style={styles.mainContainer}>
      {/* This allows the status bar background to blend in with the main UI - if this 
      isn't used, the status bar will just be black */}
      <StatusBar style="auto" />

      {/* Sub view container that holds both the header text and settings icon */}
      <View style={styles.headerContainer}>
        {/* Container for the header text */}
        <View style={styles.headerText}>
          <Text style={styles.headerText}>CCSE Events</Text>
        </View>

        {/* Container for the settings icon  */}
        <View>
          {/* Use TouchableHighlight to make this pressable/touchable when the time comes */}
          <Image source={require('./assets/icons/settings.png')} style={styles.settingsIcon} />
        </View>
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({

  // Style for the main container - this contains all the UI in the app
  // This is set to flex: column and the sub containers are set to flex: row so that they 
  // cascade down the app view appropriately
  mainContainer: { 
    // This needs to be fixed. StatusBar.currentHeight should be able to return the status
    // bar height on Android, but it conflicts with the StatusBar expo library that makes 
    // the status bar blend in with the background. Importing both causes a conflict.
    // Using 20 as an arbitrary value for now.
    marginTop: Platform.OS === "android" ? 20 : 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    // justifyContent: 'center',

  },

  // Style for the header container - this containers both the header text and settings icon
  headerContainer: {
    flex: 0.10, 
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Sets the header text size 40 and make it bold.
  // Set the view to take up 95% of the flex row
  headerText: {
    fontSize: 40,
    marginLeft: 10,
    fontWeight: "bold",
    flex: 0.95,
    flexDirection: 'row',
  },
});
