import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, FlatList, Text, View, ImageBackground, TouchableOpacity, Linking, Button, SafeAreaView, Image, SectionList, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../styles/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import eventData from '../TestData/testData.json';
import AppFunc from '../Scripts/AppFunctions.js';

state = {
    updatedScreen: false
}

export default class EventsList extends Component {

    // App object so we can use the functions in App.js
    AppFunctions = new AppFunc();


    constructor() {
        super();
    }

    goToEvent() {
        // This is a dummy function for now - it will forward to the event details page
        alert("Event Selected!");
    }

    // This will reload the page when the user navigates to it so that it updates with the most current information
    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({updatedScreen: true});
        });
    }

    likeEvent(name) {
        // This is sued as a cache for the following script to add events too - React Native won't allow you to directly delete array elements
        // from the global variable, so we build our liked events in this cache and then reassign it to the global variable
        var likedCache = [];

        global.eventsDataSource.forEach(eventElement => {
            // Check to see if we've found the right event in the events list
            if (eventElement.EventName == name) {
                if (global.likedEvents.liked.length < 1) {
                    console.log("No liked elements exist - adding this one as the first");
                    likedCache.push(eventElement);
                }
                else {
                    // This variable helps us keep track of whether or not we've found a match in the following for loop
                    var deletedElement = false;
                    // Iterate through the current array of liked events
                    for (var i = 0; i < global.likedEvents.liked.length; i++) {
                        // If name equals a named in the likedEvents list, then it means we need to unlike it
                        if (global.likedEvents.liked[i].EventName == name) {
                            // Just ignore the event and DON'T add it to the liked cache
                            // Set deletedElement to true so we know that an element was disliked
                            console.log("deleting event");
                            deletedElement = true;
                        }
                        else {
                            // Otherwise, add it to our liked cache
                            console.log("adding already existing event to cache");
                            likedCache.push(global.likedEvents.liked[i]);
                        }
                    }

                    // Check deleted Element - if it's still false, that means we have a new likedEvent and we need to add it to the cache
                    if (!deletedElement) {
                        likedCache.push(eventElement);
                        console.log("New Event Added");
                    }
                }
            }
            else {
                // Do nothing - element does not match
            }
            
        });

        // Save likedEvents to the global variable
        global.likedEvents.liked = likedCache;

        // Save liked events to AsyncStorage
        this.AppFunctions.storeDataItem("likedEvents", { "liked": likedCache })

        // Update state so the page updates
        this.setState({updatedScreen: true});

        console.log(global.likedEvents.liked);
    }

    // This function is used to determine whether or not the given event has been liked - it is used to figure out which liked icon to use in the events list
    checkLiked(name) {
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

    getAnImage(imageUri) {
        // fetch(imageUri).then((data) => {
        //     return data;
        // });
        console.log("uri: " + imageUri);
        return "uri:" + imageUri;

    }

    render() {
        //console.log(JSON.stringify(global.eventsDataSource));
        // This function is used to render each individual event item
        // It is called by the FlatList renderItem property below
        // TouchableWithoutFeedback encloses each element that needs to be
        // "touchable" - ie. you press it and it goes to the event
        const renderEventItem = ({item}) => (
            
            <View key={item} style={globalStyles.eventListItemHeaderContainer}>
                
                <TouchableWithoutFeedback key={item + "ThumbnailContainer"} onPress={(this.goToEvent)}>
                    <View key={item + "Thumbnail"} style={globalStyles.eventListItemThumbnail}>
                        <Image key={item + "ThumbnailImage"}
                            style={{width: 400, height: 75}} 
                            source={{uri: item.EventImage,}} 
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback key={item + "TitleContainer"} onPress={(this.goToEvent)}>
                    <View key={item + "Title"} style={globalStyles.eventListItemTitleContainer}>
                        <Text key={item + "TitleText"} style={globalStyles.eventListItemTitle}>{item.EventName}</Text>    
                    </View>
                </TouchableWithoutFeedback>
                
                
                <View key={item + "ContentContainer"} style={globalStyles.eventListItemContentContainer}>

                    <TouchableWithoutFeedback key={item + "DescriptionContainer"} onPress={(this.goToEvent)}>
                        <View key={item + "Description"} style={globalStyles.eventListItemDescription}>
                            <Text key={item + "DescriptionText"} numberOfLines={5}>{item.FriendlyDescription}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback key={item + "LikeContainer"} onPress={() => { this.likeEvent(item.EventName) }}>
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
                            <Text style={globalStyles.headerText}>CCSE Events</Text>
                        </View>

                        <TouchableWithoutFeedback onPress={() => this.setState({updateCount: '0'})}>
                        <View style={globalStyles.refreshIcon}>
                            <Image source={require('../assets/refreshicon.png')} />
                        </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* This is the main container - it contains the FlatList that displays event items 
                    Note that to access the data correctly, you must access global.eventsDataSource._55
                    It seems that when React saves the data to Async (or when it retrieves it) it is separating the data
                    into a new object called _55 - this will need to be figured out */}
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