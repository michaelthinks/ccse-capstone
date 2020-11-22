import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  Text,
  View,
  Switch,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import { globalStyles } from "../styles/styles.js";
import { DrawerActions } from "@react-navigation/native";
import AppFunctions from "../Scripts/AppFunctions";

export default class Settings extends Component {

  state = {
    likedEvents: global.settings.likedEvents,
    newEvents: global.settings.newEvents,
  }

  // Variable to access AppFunctions
  AppFunctions = new AppFunctions();

  // Handle event when the user changes the liked events toggle
  notificationsForLikedEvents() {
    // Check the likedEvents flag in global settings and reverse it
    global.settings.likedEvents ? global.settings.likedEvents = false : global.settings.likedEvents = true;

    // If user has turned on likedEvent notifications, cancel all notifications (if case there are any) then register all liked events for notifications
    if (this.notificationsForLikedEvents) {
      this.AppFunctions.cancelAllNotifications();
      global.likedEvents.liked.forEach(eventElement => {
          this.AppFunctions.scheduleNotification("A Liked CCSE Event Is Starting Soon!", eventElement.EventName, new Date(eventElement.EventDate).valueOf());
      });
    }
    // User has turned off notifications for likedEvents
    else {
      this.AppFunctions.cancelAllNotifications;
    }

    // Save switch state to Async
    this.AppFunctions.storeDataItem("settings", global.settings);    
  }

  // Handle event when the user changes the new events toggle
  notificationsForNewEvents() {
    // Check the newEvents flag in global settings and reverse it
    global.settings.newEvents ? global.settings.newEvents = false : global.settings.newEvents = true;

    // Save switch state to Async
    this.AppFunctions.storeDataItem("settings", global.settings);
  }

  render() {
    return (
      <SafeAreaView style={globalStyles.mainContainer}>
        <StatusBar style="auto" hidden={false} />

        <View style={globalStyles.adjustedHeaderContainer}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }
          >
            <View style={globalStyles.adjustedMenuIcon}>
              <Image source={require("../assets/menu.png")} />
            </View>
          </TouchableWithoutFeedback>
          <View style={globalStyles.adjustedHeaderText}>
            <Text style={globalStyles.headerText}>Settings</Text>
          </View>
        </View>

        <View style={globalStyles.contentContainer}>
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  height: 100,
                  width: "75%",
                  paddingLeft: 15,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Receive Notifications For Liked Events{" "}
                </Text>
                <Text>
                  {this.state.likedEvents ? "Enabled" : "Disabled"}
                </Text>
              </View>

              <View
                style={{
                  height: 100,
                  width: "25%",
                  paddingRight: 15,
                }}
              >
                <Switch
                  value={this.state.likedEvents}
                  onValueChange={ () => { this.state.likedEvents ? this.setState({likedEvents: false}) : this.setState({likedEvents: true}); this.notificationsForLikedEvents()}}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  height: 100,
                  width: "75%",
                  paddingLeft: 15,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Receive Notifications For New Events
                </Text>
                <Text>
                  {this.state.newEvents ? "Enabled" : "Disabled"}
                </Text>
              </View>

              <View
                style={{
                  height: 100,
                  width: "25%",
                  paddingRight: 15,
                }}
              >
                <Switch
                  value={this.state.newEvents}
                  onValueChange={ () => { this.state.newEvents ? this.setState({newEvents: false}) : this.setState({newEvents: true}); this.notificationsForNewEvents()}}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
