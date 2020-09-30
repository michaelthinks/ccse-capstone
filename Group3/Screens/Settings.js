import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  useState,
  StyleSheet,
  FlatList,
  Text,
  View,
  Switch,
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

export default class EventsList extends Component {
  state = {
    likedEventsSwitch: false,
    newEventsSwitch: false,
    SMSSwitch: false,
  };

  render() {
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

          <View>
            <Text style={globalStyles.headerText}>Settings</Text>
          </View>
        </View>

        {/* View below provides a buffer space between the heading and the switches. Otherwise  */}
        <View
          style={{
            height: 40,
            width: "100%",
          }}
        />

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
              Receiving notifications for like events{" "}
            </Text>
            <Text>{this.state.likedEventsSwitch ? "On" : "Off"}</Text>
          </View>

          <View
            style={{
              height: 100,
              width: "25%",
              paddingRight: 15,
            }}
          >
            <Switch
              value={this.state.likedEventsSwitch}
              onValueChange={(likedEventsSwitch) => this.setState({ likedEventsSwitch })
              }
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
              Receive notification for new events
            </Text>
            <Text>{this.state.newEventsSwitch ? "On" : "Off"}</Text>
          </View>

          <View
            style={{
              height: 100,
              width: "25%",
              paddingRight: 15,
            }}
          >
            <Switch
              value={this.state.newEventsSwitch}
              onValueChange={(newEventsSwitch) => this.setState({ newEventsSwitch })
              }
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
              Receive events notifications via SMS
            </Text>
            <Text>{this.state.SMSSwitch ? "On" : "Off"}</Text>
          </View>

          <View
            style={{
              height: 100,
              width: "25%",
              paddingRight: 15,
            }}
          >
            <Switch
              value={this.state.SMSSwitch}
              onValueChange={(SMSSwitch) => this.setState({ SMSSwitch })}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}