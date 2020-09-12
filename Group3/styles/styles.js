import { StyleSheet, Platform } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF50',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: ( Platform.OS === 'android' ) ? 0 : 0,
        paddingBottom: 5,
      },
    
    contentContainer: {
        flex: 0.90,
        flexDirection: 'row',
    },

    eventList: {
      marginLeft: 10,
      marginRight: 10,
      flex: 1,
    },

    eventListItem: {
      flex: 0.20,
      flexDirection: "column",
      marginBottom: 20,
    },

    eventListItemTitleContainer: {
      flex: 0.7,
      flexDirection: "row",
    },

    eventListItemDateContainer: {
      flexDirection: "row-reverse",
      flex: 0.3,
    },

    eventListItemContentContainer: {
      flexDirection: "row",
      marginBottom: 10,
    },

    eventListItemTitle: {
      fontSize: 20,
      fontWeight: "bold",

    },

    eventListItemDate: {
      marginBottom: 0,

    },

    eventListItemDescription: {
      flex: .8,
      flexDirection: "row",
    },

    eventListItemThumbnail: {
      flex: 0.2,
      flexDirection: "row",
      justifyContent: "center",
    },

    headerText: {
        fontSize: 40,
        marginLeft: 5,
        fontWeight: "bold",
        flex: .9,
        flexDirection: 'row',
    },
    
    refreshIcon: {
      flex: 0.1,
      flexDirection: "row-reverse",
      margin: 10,
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