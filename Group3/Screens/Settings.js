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
import AsyncStorage from '@react-native-community/async-storage';

export default class EventsList extends Component {
  state = {
    likedEventsSwitch: false,
    newEventsSwitch: false,
    SMSSwitch: true,
    darkTheme: true,
  };

  

  render() {

  
    return (
      <SafeAreaView style={globalStyles.mainContainer}>
        <StatusBar style="auto" hidden={false} />

        <View style={globalStyles.adjustedHeaderContainer}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
              <View style={globalStyles.adjustedMenuIcon}>
                  <Image source={require('../assets/menu.png')} />
              </View>
          </TouchableWithoutFeedback>
          <View style={globalStyles.adjustedHeaderText}>
              <Text style={globalStyles.headerText}>Settings</Text>
          </View>

      </View>

        
      <View style={globalStyles.contentContainer}>
        <View style={{flexDirection: "column"}}>
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
              <Text>{this.state.likedEventsSwitch ? "Enabled" : "Disabled"}</Text>
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
                  (likedEventsSwitch) => this.setState({ likedEventsSwitch })
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
              <Text>{this.state.newEventsSwitch ? "Enabled" : "Disabled"}</Text>
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
                onValueChange={(SMSSwitch) => this.setState({ SMSSwitch })}
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
                onValueChange={(darkTheme) => this.setState({ darkTheme }), doThis(this.darkTheme), doThis(this.value)}
                //
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
    );
  }
}
const doThis = (prop) => {
    console.log(prop)
}

const save = async (prop) => {
  try {
      await AsyncStorage.setItem('temp', JSON.stringify(darkTheme));
      const value = await AsyncStorage.getItem('temp');
      const result = JSON.parse(value);
      console.log(result);
  } catch (err) {
      console.log(err);
  }
}