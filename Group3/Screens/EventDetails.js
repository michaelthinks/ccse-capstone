import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, ImageBackground, TouchableOpacity, Linking, Button, SafeAreaView, Image, SectionList, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { globalStyles } from '../styles/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { WebView } from 'react-native-webview';
import eventData from '../TestData/testData.json';
import AppFunc from '../Scripts/AppFunctions.js';
import EventsList from './EventsList.js';

state = {
    updatedScreen: false
}

export default class EventDetails extends Component {

    // App object so we can use the functions in App.js
    AppFunctions = new AppFunc();

    // Import EventsList so we can access Events functions
    EventFunctions = new EventsList();

    constructor() {
        super();
    }

    // This function triggers when the user clicks a link within the webview - it opens
    // the link in an external browser instead of opening it in the web view
    openLinkFromWebView(link) {
        Linking.openURL(link.url);
    }

    // This function will trigger set state and cause the page to refresh
    updateEvents() {
        this.setState({updatedScreen: true});
    }

    render() {

        // Get the parameters passed to EventDetails so we can load the correct event
        const { eventToView } = this.props.route.params;

        // This variable will hold all of the event data once we search through the global event list and find it
        var event;

        // Search through the global event list for the correct event
        global.eventsDataSource.forEach(eventElement => {
            // Check to see if we've found the right event in the events list
            if (eventElement.EventName == eventToView) {
                // Assign the object to event so we can access it to render the event
                event = eventElement;
            }
        })
        
        return(
            // SafeAreaView is iOS specific and doesn't do anything on Android. It keeps the main 
            // View are below the notch on an iPhone
            <SafeAreaView style={globalStyles.mainContainer}>
                {/* Sets touchbar back to being visible */}
                <StatusBar style="auto" hidden={false} />
                    {/* This contains the header - title and refresh icon */}
                    
                    <View style={globalStyles.eventDetailsHeaderContainer}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={globalStyles.menuIcon}>
                                <Image source={require('../assets/backIcon.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={globalStyles.headerText}>
                            <Text style={globalStyles.headerText}>Event Details</Text>
                        </View>

                        <TouchableWithoutFeedback onPress={() => { this.EventFunctions.likeEvent(eventToView); this.updateEvents() }}>
                            <View style={globalStyles.refreshIcon}>  
                                {/* Choose the appropriate icon depending on whether or not the event is liked */}
                                {this.EventFunctions.checkLiked(event.EventName)}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* This is the main container - it contains the FlatList that displays event items 
                    Note that to access the data correctly, you must access global.eventsDataSource._55
                    It seems that when React saves the data to Async (or when it retrieves it) it is separating the data
                    into a new object called _55 - this will need to be figured out */}
                    <View style={globalStyles.eventDetailsThumbnailContainer}>
                        <Image
                            style={globalStyles.eventDetailsThumbnail} 
                            source={{uri: event.EventImage,}} 
                        />
                    </View>

                    <View style={globalStyles.addToCalendarButton}>
                        <TouchableWithoutFeedback>
                            <Button onPress={ () => alert("Add To Calendar") } color="#febc11" title="Add To Calendar" accessibilityLabel="This button will add the event to the system calendar" />
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={globalStyles.eventDetailsContentContainer}>

                        <View style={globalStyles.eventDetailsTitleContainer}>
                            <Text style={globalStyles.eventDetailsTitle}>{event.EventName}</Text>    
                        </View>

                        <View style={globalStyles.eventDetailsDateContainer}>
                            <Text style={globalStyles.eventDetailsDate}>{event.EventDate}</Text>
                        </View>
                    </View>
                        
                        
                    <WebView source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + event.EventDescription + "</body></html>"}} 
                        style={globalStyles.eventDetailsWebView} 
                        onShouldStartLoadWithRequest={this.openLinkFromWebView} >


                    </WebView>



            </SafeAreaView>
        )
    }
}