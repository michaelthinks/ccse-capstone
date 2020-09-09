import { StyleSheet, Platform } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF50',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: ( Platform.OS === 'android' ) ? 0 : 0,
      },

    headerText: {
        fontSize: 40,
        marginLeft: 10,
        fontWeight: "bold",
        flex: 0.95,
        flexDirection: 'row',
     },

    text: {
        fontFamily: 'sans-serif-light',
        fontSize: 30,
        color: '#333',
        textAlign: 'center',
    },

    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: '100%',
        height: '100%',
      },

    bottomPage: {
        width: '100%', 
        height: 50,  
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 220,
      },

     mainContainer: { 
        // This needs to be fixed. StatusBar.currentHeight should be able to return the status
        // bar height on Android, but it conflicts with the StatusBar expo library that makes 
        // the status bar blend in with the background. Importing both causes a conflict.
        // Using 20 as an arbitrary value for now.
        marginTop: Platform.OS === "android" ? 20 : 0,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        // justifyContent: 'center',
    
      },

      headerContainer: {
        flex: 0.10, 
        flexDirection: 'row',
        alignItems: 'center',
      },
})