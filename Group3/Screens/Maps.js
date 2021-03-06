// Released under the MIT License - see LICENSE.txt
//
// Maps.js renders the campus maps in a scrollable view

import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Button, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../styles/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';

// Properties to control what image (campus map) we are displaying
kennesawImage = false;
mariettaImage = false;

export default class Maps extends Component {
    
    // Set the maps to false when user first visits the page
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

    // Reset the page when user selects the close map button
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

                            <View style={globalStyles.adjustedHeaderContainer}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                                    <View style={globalStyles.adjustedMenuIcon}>
                                        <Image source={require('../assets/menu.png')} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={globalStyles.adjustedHeaderText}>
                                    <Text style={globalStyles.headerText}>Maps</Text>
                                </View>


                            </View>
                    }
                    {/* See above notes on this expression/view */}        
                    {!this.state.mariettaImage && !this.state.kennesawImage &&
                            <View style={globalStyles.adjustedContentContainer}>
                                    <View style={globalStyles.mapsButtonContainer}>
                                        <View style={globalStyles.mapsButton}>

                                            <Button
                                                style={globalStyles.mapsButton}
                                                onPress={this.displayKennesawMap}
                                                title="Kennesaw Campus Map"
                                                color="#febc11"
                                                accessibilityLabel="This button will display the campus map for the KSU Kennesaw Campus" 
                                            />
                                        </View>
                                        <View style={globalStyles.mapsButton}>
                                            <Button
                                                style={globalStyles.mapsButton} 
                                                onPress={this.displayMariettaMap}
                                                title="Marietta Campus Map"
                                                color="#febc11"
                                                accessibilityLabel="This button will display the campus map for the KSU Marietta Campus" 
                                            />
                                        </View>
                                    </View>
                            </View>
                        
                    }
                    {/* This will display a scrollable campus map when the respective map button is pressed */}   
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
                    {/* This will display a scrollable campus map when the respective map button is pressed */}
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