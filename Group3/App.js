import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
  AsyncStorage, Alert
} from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { globalStyles } from "./styles/styles.js";

//Importing different screens
import EventsList from "./Screens/EventsList";
import Home from "./Screens/Home";
import LikedEvents from "./Screens/LikedEvents.js";
import Maps from "./Screens/Maps";
import Settings from "./Screens/Settings";

// Import test data
import eventTestDataFile from './TestData/testData.json';

//used to set up Drawer and Stack Navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends Component {

  



  // Constructor for the app - this is the intialization code for the application
  // The code to retrieve the data, save it to a JSON object will be performed here
  // It will be performed when the app is first opened OR we can force refresh it (will implement later)
  // constructor(props) {
  //   super(props);
  //   this.saveEventData();
  // }

  // // This function refreshes the event (gathers data from website, stores it in asyncstorage)
  // async saveEventData() {
  //   // Note this is using dummy data for the time being!
  //   AsyncStorage.setItem('events', JSON.stringify(eventTestDataFile));
  // }

  render() {
    const EVENT_STORAGE_KEY = '@save_events';

    const App = () => {
      const [events, setEvents] = useState(eventTestDataFile);
    }

    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem(EVENT_STORAGE_KEY, events);
        Alert.alert("Woo! saved");
      } catch (e) {
        Alert.alert("There was a booboo");
      }
    }

    const readEvents = async () => {
      try {
        const getTheEvents = await AsyncStorage.getItem(EVENT_STORAGE_KEY);

        if (getTheEvents !== null) {
          setEvents(getTheEvents);
        }
        Alert.alert("woo, read!");
      } catch (e) {
        Alert.alert("there was a booboo");
      }
    }

    return (
      <View style={globalStyles.container}>
        <ImageBackground
          source={require("../Group3/assets/KSU.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          {/* This block of code is used to set set up the drawers on the main page of the app
              and link each screen together. */}
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Events" component={EventsList} />
              <Drawer.Screen name="Liked Events" component={LikedEvents} />
              <Drawer.Screen name="Campus Maps" component={Maps} />
              <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
          </NavigationContainer>
        </ImageBackground>
      </View>
    );
  }
}
