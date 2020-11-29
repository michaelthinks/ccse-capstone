// Released under the MIT License - see LICENSE.txt
//
// EventsList.js is where the user will spend most of their time. This file also contains all of the functions associated 
// with liking events, navigating to events, and getting information for events. Other event-related screens, such as 
// EventDetails and LikedEvents, import this file and use it's function to render their event information as well.

import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, Text, View, Linking, SafeAreaView, Image, TouchableWithoutFeedback, Alert, ToastAndroid } from 'react-native';
import { globalStyles } from '../styles/styles.js';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import AppFunc from '../Scripts/AppFunctions.js';

// State flag used to determine if the page needs to be updated
// Also used for triggering a refresh
state = {
    updatedScreen: false
}

export default class EventsList extends Component {
    constructor() {
        super();
    }
    // Import AppFunctions
    AppFunctions = new AppFunc();

    // This function will navigate to the event details page to view more information about the event
    goToEvent(event) {
        this.props.navigation.navigate('Event Details', {
            eventToView: event,
        });
    }

    // This will reload the page when the user navigates to it so that it updates with the most current information
    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({updatedScreen: true});
        });
    }

    likeEvent(name) {
        // Check to see if the user found the easter egg and clicked the like button
        // If we don't do this, it'll crash the app if they like the event easter egg
        if (name == "surprise") {
            Alert.alert(":D", "Thanks for liking us! You're pretty cool too.");
        }
        // Otherwise, carry on as normal
        else {
            // This is sued as a cache for the following script to add events too - React Native won't allow you to directly delete array elements
            // from the global variable, so we build our liked events in this cache and then reassign it to the global variable
            var likedCache = [];

            // This variable helps us keep track of whether or not we've found a match in the following for loop
            var deletedElement = false;

            // Iterate through each event in the eventsDataSource to find the correct one to like
            global.eventsDataSource.forEach(eventElement => {
                // Check to see if we've found the right event in the events list
                if (eventElement.EventName == name) {
                    if (global.likedEvents.liked.length < 1) {
                        likedCache.push(eventElement);

                        // Add new event to notifications list if user has likedEvents notifications enabled
                        if (global.settings.likedEvents) {
                            this.AppFunctions.scheduleNotification("A Liked CCSE Event Is Starting Soon!", eventElement.EventName, new Date(eventElement.EventDate).valueOf());       
                        }
                    }
                    else {
                        // Iterate through the current array of liked events
                        for (var i = 0; i < global.likedEvents.liked.length; i++) {
                            // If name equals a named in the likedEvents list, then it means we need to unlike it
                            if (global.likedEvents.liked[i].EventName == name) {
                                // Just ignore the event and DON'T add it to the liked cache
                                // Set deletedElement to true so we know that an element was disliked
                                deletedElement = true;
                            }
                            else {
                                // Otherwise, add it to our liked cache
                                likedCache.push(global.likedEvents.liked[i]);
                            }
                        }

                        // Check deleted Element - if it's still false, that means we have a new likedEvent and we need to add it to the cache
                        if (!deletedElement) {
                            likedCache.push(eventElement);

                            // Add new event to notifications list
                            if (global.settings.likedEvents) {
                                this.AppFunctions.scheduleNotification("A Liked CCSE Event Is Starting Soon!", eventElement.EventName, new Date(eventElement.EventDate).valueOf());
                            }
                        }
                    }
                }
                else {
                    // Do nothing - the element does not match so we continue to the next event element
                }
                
            });

            // Save likedEvents to the global variable
            global.likedEvents.liked = likedCache;

            // Save liked events to AsyncStorage persistent storage
            this.AppFunctions.storeDataItem("likedEvents", { "liked": likedCache })

            // Check if an element was deleted - if so, cancel notification for liked events and re-register the remaining ones
            if (deletedElement) {
                // There isn't a way to easily remove a single event notification, so cancel all liked event notifications and
                // reload them
                this.AppFunctions.cancelAllNotifications();

                // Check to see if any events are liked and, if so, iterate through them and create a notification for them
                if(global.settings.likedEvents) {
                    global.likedEvents.liked.forEach(eventElement => {
                        this.AppFunctions.scheduleNotification("A Liked CCSE Event Is Starting Soon!", eventElement.EventName, new Date(eventElement.EventDate).valueOf());
                    });
                }
            }
        }
    }

    // This function will trigger set state and cause the page to refresh
    async updateEvents(wasEventLiked) {
        // Call retrieve and save event data to see if there are new events then refresh the page
        await this.AppFunctions.retrieveAndSaveEventData('https://calendar.kennesaw.edu/department/college_of_computing_and_software_engineering/calendar/xml');

        // Force screen refresh
        this.setState({updatedScreen: true})

        // Check wasEventLiked flag - if it's true, we don't need to display this notification
        if (!wasEventLiked || wasEventLiked == undefined) {
            // Show the user a toast - Android only, obviously
            ToastAndroid.show("Refreshing...", ToastAndroid.SHORT);
        }
    }

    // This function is used to determine whether or not the given event has been liked - it is used to figure out which liked icon to use in the events list
    checkLiked(name) {
        // Flag that is changed if the event is liked
        var eventIsLiked = false;

        // Check to see if event is liked, if it is, set out flag variable to true
        global.likedEvents.liked.forEach((eventElement) => {
            if (eventElement.EventName == name) {
                eventIsLiked = true;
            }
        });

        // Return the correct JSX image tag depending onwhether or not eventIsLiked is true
        return eventIsLiked ? <Image key="LikeImage" source={ require('../assets/likeSelectedIcon.png') }></Image> : <Image key="LikeImage" source={ require('../assets/likeIcon.png') }></Image>;
    }

    // This function properly formats the date - the RSS data gives the date in 24 hour format
    // This takes the EventAltDate from the RSS data, processes it, and gives it back as a 12 hour
    // date. This function was built with the help of this StackOverflow question:
    // https://stackoverflow.com/questions/4898574/converting-24-hour-time-to-12-hour-time-w-am-pm-using-javascript
    formatDate(date) {
        var newDate = new Date(date);
        var hours = newDate.getHours();
        var min = newDate.getMinutes();
        var sec = newDate.getSeconds();
        var tod = "AM";
        var hh = hours;

        if (hours >= 12) {
            hh = hours - 12;
            tod = "PM";
        }

        if (hh == 0) {
            hh = 12;
        }

        min = min < 10 ? "0" + min : min;

        sec = sec < 10 ? "0" + sec : sec;

        return newDate.toDateString() + " " + hh + ":" + min + " " + tod;

    }

    // This function takes a date as an argument and opens the system Calendar app
    // eventName is used in the prototype code below and not in the current functioning app
    async openCal(eventName, date) {
        // This opens the devices calendar to the correct day but does not open up a new 
        // event entry
        // Import the date and covert it to milliseconds since UNIX epoch
        var newDate = new Date(date); 
        var msSinceEpoch = newDate.getTime();

        // Find out which platform the user is using and open the proper URL
        if(Platform.OS === 'ios') {
            Linking.openURL('calshow:' + msSinceEpoch);
        } else if(Platform.OS === 'android') {
            Linking.openURL('content://com.android.calendar/time/' + msSinceEpoch);
        }

        // The following is prototype code for opening the devices external calendar to the 
        // event entry screen with the proper information filled in (event name, time, etc.).
        // This uses the built-in Expo Calendar API. I received errors when testing with Android
        // and testing was never performed with iOS. Researched showed that the best way would be 
        // to use native Android/iOS code to create the event. However, the project would need to be 
        // converted to a standard React Native project rather than an Expo project to use native code
        //
        // var endDate = new Date(date);
        // var endDate = endDate.setHours(endDate.getHours() + 1);

        // if(Platform.OS === 'ios') {
        //     Linking.openURL('calshow:');
        // } else if(Platform.OS === 'android') {
        //     await this.AppFunctions.calendarPermissions();
        //     const calendars = await Calendar.getCalendarsAsync();
        //     const calendar = calendars.find(({allowsModifications})=>allowsModifications);
        //     console.log(calendar.id);

        //     await Calendar.getCalendarPermissionsAsync()
        //     .then((status) => {
        //         if (status.granted) {

        //         }
        //         else {
        //             alert("You did not grant Calendar Permissions.");

        //         }
        //     })
        //     .then(
        //         await Calendar.createEventAsync(calendar.id, {
        //             title: eventName,
        //             startDate: date,
        //             endDate: endDate,
        //         },).then((id) => console.log(id))
        //     )
        //     .catch(alert("You did not grant Calendar Permissions."));
    }

    render() {
        // This function is used to render each individual event item
        // It is called by the FlatList renderItem property below
        // renderItem passes a single event (the item) from eventsDataSource and this function renders it
        // TouchableWithoutFeedback encloses each element that needs to be
        // "touchable" - ie. you press it and it goes to the event
        const renderEventItem = ({item}) => (
            
            <View key={item} style={globalStyles.eventListItemHeaderContainer}>
                {/* Event Thumbnail */}
                <TouchableWithoutFeedback key={item + "ThumbnailContainer"} onPress={() => this.goToEvent(item.EventName)}>
                    <View key={item + "Thumbnail"} style={globalStyles.eventListItemThumbnail}>
                        <Image key={item + "ThumbnailImage"}
                            style={{width: 400, height: 75}} 
                            source={{uri: item.EventImage,}} 
                        />
                    </View>
                </TouchableWithoutFeedback>
                {/* Event Title */}
                <TouchableWithoutFeedback key={item + "TitleContainer"} onPress={() => this.goToEvent(item.EventName)}>
                    <View key={item + "Title"} style={globalStyles.eventListItemTitleContainer}>
                        <Text key={item + "TitleText"} style={globalStyles.eventListItemTitle}>{item.EventName}</Text>    
                    </View>
                </TouchableWithoutFeedback>
                
                {/* Event Description and like button */}
                <View key={item + "ContentContainer"} style={globalStyles.eventListItemContentContainer}>

                    <TouchableWithoutFeedback key={item + "DescriptionContainer"} onPress={() => this.goToEvent(item.EventName)}>
                        <View key={item + "Description"} style={globalStyles.eventListItemDescription}>
                            <Text key={item + "DescriptionText"} numberOfLines={5}>{item.FriendlyDescription}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback key={item + "LikeContainer"} onPress={() => { this.likeEvent(item.EventName); this.updateEvents(true) } }>
                        <View key={item + "Like"} style={globalStyles.likeEventIcon}>  
                            {/* Choose the appropriate icon depending on whether or not the event is liked */}
                            {this.checkLiked(item.EventName)}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                
            </View>
            
        );  

        return(
            // SafeAreaView is iOS specific and doesn't do anything on Android. It keeps the main 
            // View are below the notch on an iPhone
            <SafeAreaView style={globalStyles.mainContainer}>
                {/* Sets touchbar back to being visible */}
                <StatusBar style="auto" hidden={false} />
                    {/* This contains the header - title and refresh icon */}
                    <View style={globalStyles.headerContainer}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                            <View style={globalStyles.menuIcon}>
                                <Image source={require('../assets/menu.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={globalStyles.headerText}>
                            <Text style={globalStyles.headerText}>Events</Text>
                        </View>

                        <TouchableWithoutFeedback onPress={() => {this.updateEvents(false)}}>
                        <View style={globalStyles.refreshIcon}>
                            <Image source={require('../assets/refreshicon.png')} />
                        </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* This is the main container - it contains the FlatList that displays event items */}
                    <View style={globalStyles.contentContainer}>
                        <FlatList
                            data={global.eventsDataSource}
                            renderItem={renderEventItem}
                            keyExtractor={(item, index) => item.EventId}
                            style={globalStyles.eventList}
                        />
                    </View>

            </SafeAreaView>
        )
    }
}