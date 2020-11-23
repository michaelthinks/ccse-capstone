// EventDetails.js is displayed when the user selects an event in EventsList or LinkedEvents.
// It displays more detailed information about the event, open the system calendar to the selected event day, 
// like/dislike the event, and open links associated with the event.

import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Linking, Button, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../styles/styles.js';
import { WebView } from 'react-native-webview';
import AppFunc from '../Scripts/AppFunctions.js';
import EventsList from './EventsList.js';

// State flag used to determine if screen has been updated so the page can be refreshed
state = {
    updatedScreen: false
}

export default class EventDetails extends Component {
    constructor() {
        super();
    }

    // App object so we can use the functions in App.js
    AppFunctions = new AppFunc();

    // Import EventsList so we can access Events functions
    EventFunctions = new EventsList();

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

        // Check to see eventToView is set to "surprise" - this is caused when the user hits the hidden button in the
        // app drawer directly below the last item
        var eventToView  = this.props.route.params ? this.props.route.params.eventToView : "surprise";

        // This variable will hold all of the event data once we search through the global event list and find it
        var event;

        // If user found the easter egg, set the event data to the east egg data instead of searching for it in
        // eventsDataSource
        if (eventToView == "surprise") {
            event = {
                "EventId": "0",
                "EventName": "Hey There!",
                "EventDate": "2030-01-01T17:00:00-05:00",
                "EventImage": "https://localist-images.azureedge.net/photos/32139136800987/small/f8122f4cd64268b65020c9066822a72bb434a790.jpg",
                "EventDescription": "Well hello there! Looks like you stumbled on our easter egg! We hope you have a wonderful day :)<br /><br />This app was developed by:<br /><strong> Paul, Michael, Patrick, Seth, and Novann</strong>",
                "FriendlyDescription" : "This is the description with all the HTML tags removed",
                "Liked": true,
                "EventAltDate": "2030-01-01T17:00:00-05:00",
                "EventLink": "https://www.kennesaw.edu" 
              };
        }
        // No easter egg - find the proper event in eventsDataSource
        else {
            // Search through the global event list for the correct event
            global.eventsDataSource.forEach(eventElement => {
                // Check to see if we've found the right event in the events list
                if (eventElement.EventName == eventToView) {
                    // Assign the object to event so we can access it to render the event
                    event = eventElement;
                }
            })
        }
        
        return(
            // SafeAreaView is iOS specific and doesn't do anything on Android. It keeps the main 
            // view area below the notch on an iPhone
            <SafeAreaView style={globalStyles.mainContainer}>
                {/* Sets touchbar back to being visible */}
                <StatusBar style="auto" hidden={false} />
                    {/* This contains the header - title and refresh icon */}
                    
                    {/* Header for the screen - contains the title, menu button and like button */}
                    <View style={globalStyles.eventDetailsHeaderContainer}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={globalStyles.menuIcon}>
                                <Image source={require('../assets/backIcon.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={globalStyles.headerText}>
                            <Text style={globalStyles.headerText}>Details</Text>
                        </View>

                        <TouchableWithoutFeedback onPress={() => { this.EventFunctions.likeEvent(eventToView); this.updateEvents() }}>
                            <View style={globalStyles.refreshIcon}>  
                                {/* Choose the appropriate icon depending on whether or not the event is liked */}
                                {this.EventFunctions.checkLiked(event.EventName)}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* This is the main container - it displays the information about the event */}
                    {/* Image associated with the event */}
                    <View style={globalStyles.eventDetailsThumbnailContainer}>
                        <Image
                            style={globalStyles.eventDetailsThumbnail} 
                            source={{uri: event.EventImage,}} 
                        />
                    </View>
                    {/* Add to calendar button */}
                    <View style={globalStyles.addToCalendarButton}>
                        <TouchableWithoutFeedback>
                            <Button onPress={ () => this.EventFunctions.openCal(event.EventName, event.EventAltDate) } color="#febc11" title="Add To Calendar" accessibilityLabel="This button will add the event to the system calendar" />
                        </TouchableWithoutFeedback>
                    </View>
                    {/* Title and date for the event */}
                    <View style={globalStyles.eventDetailsContentContainer}>

                        <View style={globalStyles.eventDetailsTitleContainer}>
                            <Text style={globalStyles.eventDetailsTitle}>{event.EventName}</Text>    
                        </View>

                        <View style={globalStyles.eventDetailsDateContainer}>
                            <Text style={globalStyles.eventDetailsDate}>{this.EventFunctions.formatDate(event.EventAltDate)}</Text>
                        </View>
                    </View>
                        
                    {/* Main description container - it is a webview that renders all the description data (which has embedded HTML) */}
                    <WebView source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + event.EventDescription + "</body></html>"}} 
                        style={globalStyles.eventDetailsWebView} 
                        onShouldStartLoadWithRequest={this.openLinkFromWebView} >
                    </WebView>



            </SafeAreaView>
        )
    }
}