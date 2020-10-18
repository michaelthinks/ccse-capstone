import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, FlatList, Text, View, ImageBackground, TouchableOpacity, Linking, Button, SafeAreaView, Image, SectionList, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../styles/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import eventData from '../TestData/testData.json';

//const eventData = JSON.parse(AsyncStorage.getItem('events'));

export default class EventsList extends Component {

    goToEvent() {
        // This is a dummy function for now - it will forward to the event details page
        alert("Event Selected!");
    }

    likeEvent() {
        // This is a dummy function for now - it will foward to a function to like an event
        alert("Event Liked!");
    }

    getAnImage(imageUri) {
        fetch(imageUri).then((data) => {
            return data;
        });
    }

    render() {
        console.log(JSON.stringify(global.eventsDataSource));
        // This function is used to render each individual event item
        // It is called by the FlatList renderItem property below
        // TouchableWithoutFeedback encloses each element that needs to be
        // "touchable" - ie. you press it and it goes to the event
        const renderEventItem = ({item}) => (
            
            <View key={item} style={globalStyles.eventListItemHeaderContainer}>
                
                <TouchableWithoutFeedback key={item + "ThumbnailContainer"} onPress={(this.goToEvent)}>
                    <View key={item + "Thumbnail"} style={globalStyles.eventListItemThumbnail}>
                        <Image key={item + "ThumbnailImage"} source={this.getAnImage(item.EventImage)} />
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
                    <TouchableWithoutFeedback key={item + "LikeContainer"} onPress={(this.likeEvent)}>
                        <View key={item + "Like"} style={globalStyles.likeEventIcon}>
                            <Image key={item + "LikeImage"} source={require('../assets/likeIcon.png')}></Image>
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
                            data={global.eventsDataSource._55}
                            renderItem={renderEventItem}
                            keyExtractor={(item, index) => item.EventId}
                            style={globalStyles.eventList}
                            
                        />
                    </View>

            </SafeAreaView>
        )
    }
}