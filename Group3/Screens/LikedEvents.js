import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Button,
  SafeAreaView,
  Image,
  SectionList,
  TouchableWithoutFeedback,
} from "react-native";
import { globalStyles } from "../styles/styles.js";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import eventData from "../TestData/testData.json";
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
      const renderEventItem = ({ item }) => (
        
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
        <SafeAreaView style={globalStyles.mainContainer}>
          <StatusBar style="auto" hidden={false} />

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
              <Text style={globalStyles.headerText}>Liked Events</Text>
            </View>

            <TouchableWithoutFeedback
              onPress={() => this.setState({})}
            >
              <View style={globalStyles.refreshIcon}>
                <Image source={require("../assets/refreshicon.png")} />
              </View>
            </TouchableWithoutFeedback>
          </View>

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
