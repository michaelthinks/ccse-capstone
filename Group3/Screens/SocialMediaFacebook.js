import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Linking, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../styles/styles.js';
import { DrawerActions } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default class SocialMediaFacebook extends Component {
    
    render() {  

        return(
            // SafeAreaView is iOS specific and doesn't do anything on Android. It keeps the main 
            // View are below the notch on an iPhone
            <SafeAreaView style={globalStyles.mainContainer}>
                {/* Sets touchbar back to being visible */}
                <StatusBar style="auto" hidden={false} />
                {/* This contains the header - title and refresh icon */}
                
                <View style={globalStyles.headerContainer}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                        <View style={globalStyles.menuIcon}>
                            <Image source={require('../assets/menu.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={globalStyles.headerText}>
                        <Text style={globalStyles.headerText}>Facebook</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.facebook.com/KSUCCSE/')}>
                    <View style={globalStyles.refreshIcon}>
                        <Image source={require('../assets/openInBrowser.png')} />
                    </View>
                    </TouchableWithoutFeedback>
                </View>
                <WebView source={{uri: 'https://www.facebook.com/KSUCCSE/'}} style={globalStyles.webViewContainer} >


                </WebView>
            </SafeAreaView>
        )
    }
}