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
import AsyncStorage from "@react-native-community/async-storage";

export default class EventsList extends Component {


  state = {
    likedEventsSwitch: false,
    newEventsSwitch: false,
    SMSSwitch: false,
    darkTheme: false,
  };

  // looks like switch state above over rides whatever is in componentDidMount because componentdidmount runs first and then state sets it to false???
  async componentDidMount() {
    
    console.log("***component did mount***")
    printState(this.state.darkTheme);
    this.state.darkTheme = getSwitchState();
    //printState(this.state.darkTheme);
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
                  onValueChange={ () => {this.state.likedEventsSwitch ? this.setState({likedEventsSwitch: false}) : this.setState({likedEventsSwitch: true}); notificationsForLikedEvents}}
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
                  onValueChange={ () => {this.state.newEventsSwitch ? this.setState({newEventsSwitch: false}) : this.setState({newEventsSwitch: true}); notificationsForNewEvents}}
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
                  onValueChange={ () => {this.state.SMSSwitch ? this.setState({SMSSwitch: false}) : this.setState({SMSSwitch: true}); receiveSmsNotifications}}
                  
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
                  onValueChange={ () => {this.state.darkTheme ? this.setState({darkTheme: false}) : this.setState({darkTheme: true}); darkThemeActions}}
                  
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const notificationsForLikedEvents = (prop) => {
  // Do something when receiving notifications for liked events switch is triggered
}

const notificationsForNewEvents = (prop) => {
  // Do something about notifications when new events occur
}

const receiveSmsNotifications = (prop) => {
  // Do something when user wants SMS notifications
}

const darkThemeActions = (prop) => {
  // Do something when dark theme switch is triggered
}



// You probably no longer need these functions unless you want to use them for debugging, etc.
const printState = (prop) => {
  console.log(prop);
};

const setSwitchState = async (prop) => {
  try {
    await AsyncStorage.setItem('result', JSON.stringify(prop));
    console.log("set: " + prop);
  } catch (error) {
      alert("set: " + error);
  }
};

const getSwitchState = async () => {
  try {
    var value = await AsyncStorage.getItem('result')
    .then((data) => JSON.parse(data))
    .then((valueParsed) => {
      if (valueParsed !== null) {
        //console.log("get: " + valueParsed);
        return (valueParsed);
      } else {
          console.log("get: empty");
          return (false);
      }
    })
    .then((data) => console.log(data._65));
  } catch (error) {
    alert("get: " + error);
  }
};



/* OLD CODE

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
import AsyncStorage from "@react-native-community/async-storage";

export default class EventsList extends Component {
  state = {
    likedEventsSwitch: false,
    newEventsSwitch: false,
    SMSSwitch: false,
    darkTheme: false,
  };

  // looks like switch state above over rides whatever is in componentDidMount because componentdidmount runs first and then state sets it to false???
  async componentDidMount() {
    
    console.log("***component did mount***")
    printState(this.state.darkTheme);
    this.state.darkTheme = getSwitchState();
    //printState(this.state.darkTheme);
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
                  onValueChange={ () => {
                    //printState(this.state.darkTheme),
                     //this function is in the wrong place, it should be BELOW the next line so that it records the switch state after its changed, but react native doesnt like it
                    (darkTheme) => this.setState(!darkTheme)
                    .then(setSwitchState(this.state.darkTheme))
                  }}
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
    await AsyncStorage.setItem('result', JSON.stringify(prop));
    console.log("set: " + prop);
  } catch (error) {
      alert("set: " + error);
  }
};

const getSwitchState = async () => {
  try {
    var value = await AsyncStorage.getItem('result')
    .then((data) => JSON.parse(data))
    .then((valueParsed) => {
      if (valueParsed !== null) {
        //console.log("get: " + valueParsed);
        return (valueParsed);
      } else {
          console.log("get: empty");
          return (false);
      }
    })
    .then((data) => console.log(data._65));
  } catch (error) {
    alert("get: " + error);
  }
};
*/