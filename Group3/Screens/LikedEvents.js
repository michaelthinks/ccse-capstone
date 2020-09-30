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

export default class LikedEvents extends Component {
  goToEvent() {
    alert("Event Selected!");
  }

  //This function will be changed later to toggle if the event is liked or not.  Needs to be able to remove liked status as well.
  //Could make another json file with liked events stored on it
  likeEvent() {
    alert("Event Liked!");
  }

  render() {
      const renderEventItem = ({ item }) => (
        
        <View key={item}>
          {item.Liked &&
          <View style={globalStyles.eventListItemHeaderContainer}>
            <TouchableWithoutFeedback
              key={item + "TitleContainer"}
              onPress={this.goToEvent}
            >
              <View
                key={item + "Title"}
                style={globalStyles.eventListItemTitleContainer}
              >
                <Text
                  key={item + "TitleText"}
                  style={globalStyles.eventListItemTitle}
                >
                  {item.EventName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View
              key={item + "DateContainer"}
              style={globalStyles.eventListItemDateContainer}
            >
              <Text
                key={item + "DateText"}
                style={globalStyles.eventListItemDate}
              >
                {item.EventDate}
              </Text>
            </View>

            <View
              key={item + "ContentContainer"}
              style={globalStyles.eventListItemContentContainer}
            >
              <TouchableWithoutFeedback
                key={item + "ThumbnailContainer"}
                onPress={this.goToEvent}
              >
                <View
                  key={item + "Thumbnail"}
                  style={globalStyles.eventListItemThumbnail}
                >
                  <Image
                    key={item + "ThumbnailImage"}
                    source={require("../assets/testthumbnail.jpg")}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                key={item + "DescriptionContainer"}
                onPress={this.goToEvent}
              >
                <View
                  key={item + "Description"}
                  style={globalStyles.eventListItemDescription}
                >
                  <Text key={item + "DescriptionText"} numberOfLines={5}>
                    {item.EventDescription}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                key={item + "LikeContainer"}
                onPress={this.likeEvent}
              >
                <View key={item + "Like"} style={globalStyles.likeEventIcon}>
                  <Image
                    key={item + "LikeImage"}
                    source={require("../assets/likeIcon.png")}
                  ></Image>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          }
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
              <Text style={globalStyles.headerText}>CCSE Events</Text>
            </View>

            <TouchableWithoutFeedback
              onPress={() => this.setState({ updateCount: "0" })}
            >
              <View style={globalStyles.refreshIcon}>
                <Image source={require("../assets/refreshicon.png")} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={globalStyles.contentContainer}>
            <FlatList
              data={eventData}
              renderItem={renderEventItem}
              keyExtractor={(item) => {
                return eventData.EventId;
              }}
              style={globalStyles.eventList}
            />
          </View>
        </SafeAreaView>
      );
    }
  }