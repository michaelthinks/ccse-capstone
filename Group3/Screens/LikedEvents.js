// LikedEvents.js displays the list of events that the user has liked
// This screen functions very similarly to EventsList.js except that it queries the 
// global.likedEvents data source rather than the main events data source.

import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { globalStyles } from "../styles/styles.js";
import { DrawerActions } from "@react-navigation/native";
import EventsList from "./EventsList.js";


export default class LikedEvents extends Component {
  
  // Variable to create a new EventsList object so we can use the functions in EventsList
  EventsFunctions = new EventsList();

  // This will reload the page when the user navigates to it so that it updates with the most current information
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
        this.setState({});
    });
  }

  render() {
      // This function is used to render each individual event item
      // It is called by the FlatList renderItem property below
      // renderItem passes a single event (the item) from eventsDataSource and this function renders it
      // TouchableWithoutFeedback encloses each element that needs to be
      // "touchable" - ie. you press it and it goes to the event
      const renderEventItem = ({ item }) => (
        
        <View key={item} style={globalStyles.eventListItemHeaderContainer}>
          {/* Event Thumbnail */}
          <TouchableWithoutFeedback key={item + "ThumbnailContainer"} onPress={(this.goToEvent)}>
              <View key={item + "Thumbnail"} style={globalStyles.eventListItemThumbnail}>
              <Image key={item + "ThumbnailImage"}
                            style={{width: 400, height: 75}}
                            source={{uri: item.EventImage,}} 
                        />
              </View>
          </TouchableWithoutFeedback>
          
          {/* Event Title */}
          <TouchableWithoutFeedback key={item + "TitleContainer"} onPress={(this.goToEvent)}>
              <View key={item + "Title"} style={globalStyles.eventListItemTitleContainer}>
                  <Text key={item + "TitleText"} style={globalStyles.eventListItemTitle}>{item.EventName}</Text>    
              </View>
          </TouchableWithoutFeedback>
          
          {/* Event Description and like button */}
          <View key={item + "ContentContainer"} style={globalStyles.eventListItemContentContainer}>

              <TouchableWithoutFeedback key={item + "DescriptionContainer"} onPress={(this.EventsFunctions.goToEvent)}>
                  <View key={item + "Description"} style={globalStyles.eventListItemDescription}>
                      <Text key={item + "DescriptionText"} numberOfLines={5}>{item.FriendlyDescription}</Text>
                  </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback key={item + "LikeContainer"} onPress={() => { this.EventsFunctions.likeEvent(item.EventName); this.setState({}) }}>
                  <View key={item + "Like"} style={globalStyles.likeEventIcon}>  
                      {/* Choose the appropriate icon depending on whether or not the event is liked */}
                      {this.EventsFunctions.checkLiked(item.EventName) }
                  </View>
              </TouchableWithoutFeedback>
          </View>
          
      </View>
      );

      return (
        // SafeAreaView is iOS specific and doesn't do anything on Android. It keeps the main 
        // View are below the notch on an iPhone
        <SafeAreaView style={globalStyles.mainContainer}>
          <StatusBar style="auto" hidden={false} />
          {/* Title and refresh button */}
          <View style={globalStyles.headerContainer}>
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
            >
              <View style={globalStyles.menuIcon}>
                <Image source={require("../assets/menu.png")} />
              </View>
            </TouchableWithoutFeedback>
            <View style={globalStyles.headerText}>
              <Text style={globalStyles.headerText}>Liked</Text>
            </View>

            <TouchableWithoutFeedback
              onPress={() => this.setState({})}
            >
              <View style={globalStyles.refreshIcon}>
                <Image source={require("../assets/refreshicon.png")} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* This is the main container - it contains the FlatList that displays event items */}
          <View style={globalStyles.contentContainer}>
            <FlatList
              data={global.likedEvents.liked}
              renderItem={renderEventItem}
              keyExtractor={(item, index) => item.EventId}
              style={globalStyles.eventList}
              extraData={this.state}
            />
          </View>
        </SafeAreaView>
      );
    }
  }
