import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, ImageBackground, TouchableOpacity, Linking, Button, SafeAreaView, Image, SectionList, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../styles/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import eventData from '../TestData/testData.json';

// Properties to control what image (campus map) we are displaying
kennesawImage = false;
mariettaImage = false;

export default class Maps extends Component {
    
    constructor() {
        super();
        this.state = {kennesawImage: false};
        this.state = {mariettaImage: false};
    }

    displayKennesawMap = () => {
        this.setState({mariettaImage: false});
        this.setState({kennesawImage: true});
    }

    displayMariettaMap = () => {
        this.setState({kennesawImage: false});
        this.setState({mariettaImage: true});

    }

    resetImages = () => {
        this.setState({mariettaImage: false});
        this.setState({kennesawImage: false});
    }


    render() {  

        return(
            // SafeAreaView is iOS specific and doesn't do anything on Android. It keeps the main 
            // View are below the notch on an iPhone
            <SafeAreaView style={globalStyles.mainContainer}>
                {/* Sets touchbar back to being visible */}
                <StatusBar style="auto" hidden={false} />
                    {/* This will render the header and map buttons if the image properties are set to false
                    each button will set its respective property to true. Note that this had to be separated out into 
                    2 different instances as each JSX expression can only have 1 parent view element. Testing found that 
                    creating a single parent View and putting both the header and content views inside of it created 
                    alignment issues */}
                    {!this.state.mariettaImage && !this.state.kennesawImage &&

                            <View style={globalStyles.mapsHeaderContainer}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                                    <View style={globalStyles.mapsMenuIcon}>
                                        <Image source={require('../assets/menu.png')} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={globalStyles.mapsHeaderText}>
                                    <Text style={globalStyles.headerText}>Campus Maps</Text>
                                </View>


                            </View>
                    }
                    {/* See above notes on this expression/view */}        
                    {!this.state.mariettaImage && !this.state.kennesawImage &&
                            <View style={globalStyles.mapsContentContainer}>
                                    <View style={globalStyles.mapsButtonContainer}>
                                        <View style={globalStyles.mapsButton}>

                                            <Button
                                                style={globalStyles.mapsButton}
                                                onPress={this.displayKennesawMap}
                                                title="Kennesaw Campus Map"
                                                color="#febc11"
                                                accessibilityLabel="This button will display the compass map for the KSU Kennesaw Campus" 
                                            />
                                        </View>
                                        <View style={globalStyles.mapsButton}>
                                            <Button
                                                style={globalStyles.mapsButton} 
                                                onPress={this.displayMariettaMap}
                                                title="Marietta Campus Map"
                                                color="#febc11"
                                                accessibilityLabel="This button will display the compass map for the KSU Marietta Campus" 
                                            />
                                        </View>
                                    </View>
                            </View>
                        
                    }
                    {/* This will display a scrollable compass map when the respective map button is pressed */}   
                    {this.state.kennesawImage &&
                        <View>
                            <View>
                                <TouchableWithoutFeedback onPress={this.resetImages}>
                                    <Button onPress={this.resetImages} color="#febc11" title="Close Map" accessibilityLabel="This button will close the campus map" />
                                </TouchableWithoutFeedback>
                            </View>
                            
                            <ScrollView>
                                <ScrollView horizontal>
                                    <Image source={require('../assets/kennesawCampusMap.jpg')} />
                                </ScrollView>
                            </ScrollView>
                        </View>
                    }
                    {/* This will display a scrollable compass map when the respective map button is pressed */}
                    {this.state.mariettaImage &&
                        <View>
                            <View>
                                <TouchableWithoutFeedback onPress={this.resetImages}>
                                    <Button onPress={this.resetImages} color="#febc11" title="Close Map" accessibilityLabel="This button will close the campus map" />
                                </TouchableWithoutFeedback>
                            </View>
                            <ScrollView>
                                <ScrollView horizontal>
                                    <Image source={require('../assets/mariettaCampusMap.jpg')} />
                                </ScrollView>
                            </ScrollView>
                        </View>
                    }

            </SafeAreaView>
        )
    }
}