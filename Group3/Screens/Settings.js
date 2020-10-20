import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
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
import AsyncStorage from "@react-native-community/async-storage";

export default class EventsList extends Component {
  state = {
    likedEventsSwitch: false,
    newEventsSwitch: false,
    SMSSwitch: false,
    darkTheme: null,
  };

  // looks like switch state above over rides whatever is in componentDidMount
  componentDidMount() {
    console.log("***component did mount***")
    printState(this.state.darkTheme);
    this.state.darkTheme = getSwitchState();
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
                  Receiving notifications for like events{" "}
                </Text>
                <Text>
                  {this.state.likedEventsSwitch ? "Enabled" : "Disabled"}
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
                  value={this.state.likedEventsSwitch}
                  onValueChange={
                    (printState(this.state.likedEventsSwitch),
                    //setSwitchState(this.state.likedEventsSwitch),
                    (likedEventsSwitch) => this.setState({ likedEventsSwitch }))
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
                <Text>
                  {this.state.newEventsSwitch ? "Enabled" : "Disabled"}
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
                  value={this.state.newEventsSwitch}
                  onValueChange={
                    (printState(this.state.newEventsSwitch),
                    //setSwitchState(this.state.newEventsSwitch),
                    (newEventsSwitch) => this.setState({ newEventsSwitch }))
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
                <Text>{this.state.SMSSwitch ? "Enabled" : "Disabled"}</Text>
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
                  onValueChange={
                    (printState(this.state.SMSSwitch),
                    //setSwitchState(this.state.SMSSwitch),
                    (SMSSwitch) => this.setState({ SMSSwitch }))
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
                  Dark Theme
                </Text>
                <Text>{this.state.darkTheme ? "On" : "Off"}</Text>
              </View>

              <View
                style={{
                  height: 100,
                  width: "25%",
                  paddingRight: 15,
                }}
              >
                <Switch
                  value={this.state.darkTheme}
                  onValueChange={
                    (printState(this.state.darkTheme),
                    setSwitchState(this.state.darkTheme),
                    (darkTheme) => this.setState({ darkTheme }))
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const printState = (prop) => {
  console.log(prop);
};

const setSwitchState = async (prop) => {
  try {
    await AsyncStorage.setItem("result", JSON.stringify(prop));
    console.log("set: " + prop);
  } catch (error) {
    alert("set: " + error);
  }
};

const getSwitchState = async () => {
  try {
    const value = await AsyncStorage.getItem("result");
    const valueParsed = JSON.parse(value);
    if (valueParsed !== null) {
      console.log("get: " + valueParsed);
      return (valueParsed);
    } else {
        console.log("get: empty");
        return ("false");
    }
  } catch (error) {
    alert("get: " + error);
  }
};
