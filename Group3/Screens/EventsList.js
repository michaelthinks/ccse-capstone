import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, ImageBackground, TouchableOpacity, Linking, Button, SafeAreaView, Image, SectionList, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../styles/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import eventData from '../TestData/testData.json';

export default class EventsList extends Component {
    
    goToEvent() {
        // This is a dummy function for now - it will forward to the event details page
        alert("Event Selected!");
    }

    render() {
        // This function is used to render each individual event item
        // It is called by the FlatList renderItem property below
        // TouchableWithoutFeedback encloses each element that needs to be
        // "touchable" - ie. you press it and it goes to the event
        const renderEventItem = ({item}) => (
            
            <View key={"event" + item.EventId} style={globalStyles.eventListItemHeaderContainer}>

                <TouchableWithoutFeedback onPress={(this.goToEvent)}>
                    <View style={globalStyles.eventListItemTitleContainer}>
                        <Text style={globalStyles.eventListItemTitle}>{item.EventName}</Text>    
                    </View>
                </TouchableWithoutFeedback>
                <View style={globalStyles.eventListItemDateContainer}>
                    <Text style={globalStyles.eventListItemDate}>{item.EventDate}</Text>
                </View>
                
                
                <View style={globalStyles.eventListItemContentContainer}>
                    <TouchableWithoutFeedback onPress={(this.goToEvent)}>
                        <View style={globalStyles.eventListItemThumbnail}>
                            <Image source={require('../assets/testthumbnail.jpg')} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={(this.goToEvent)}>
                        <View style={globalStyles.eventListItemDescription}>
                            <Text numberOfLines={5}>{item.EventDescription}</Text>
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
                        
                        <View style={globalStyles.headerText}>
                            <Text style={globalStyles.headerText}>CCSE Events</Text>
                        </View>

                        <TouchableWithoutFeedback onPress={() => this.setState({updateCount: '0'})}>
                        <View style={globalStyles.refreshIcon}>
                            <Image source={require('../assets/refreshicon.png')} />
                        </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* This is the main container - it contains the FlatList that displays event items */}
                    <View style={globalStyles.contentContainer}>
                        <FlatList
                            data={eventData}
                            renderItem={renderEventItem}
                            keyExtractor={item => {eventData.EventId}}
                            style={globalStyles.eventList}
                            
                        />
                    </View>

            </SafeAreaView>
        )
    }
}