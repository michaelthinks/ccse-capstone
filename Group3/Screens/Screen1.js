import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Linking, Button, SafeAreaView, Image } from 'react-native';
import { globalStyles } from '../styles/styles.js';

export default class Events extends Component {
    render() {
        return(

            <SafeAreaView style={globalStyles.mainContainer}>
                <StatusBar style="auto" />

                
                    <View style={globalStyles.headerContainer}>
                    
                        <View style={globalStyles.headerText}>
                            <Text style={globalStyles.headerText}>CCSE Events</Text>
                        </View>

                        <View>
                            <Image source={require('../assets/settings.png')} style={globalStyles.settingsIcon} />
                        </View>
                    </View>
                
            </SafeAreaView>
        )
    }
}