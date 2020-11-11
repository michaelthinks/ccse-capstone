import { StyleSheet, Platform, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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
    
    webViewContainer: {
      flexDirection: 'row',
      width: deviceWidth,
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
      marginBottom: 20,
    },

    eventListItemTitle: {
      fontSize: 20,
      fontWeight: "bold",

    },

    eventListItemDate: {
      marginBottom: 0,
      justifyContent: 'center',
    },

    eventListItemDescription: {
      flex: .98,
      flexDirection: "row",
    },

    eventListItemThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
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

      menuIcon: {
        marginLeft: 8,
      },

      homeMenuIcon: {
        marginTop: 20,
        marginLeft: 8
      },

      likeEventIcon: {
        marginLeft: 8,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center'
      },

      // The below styles are used for the maps and settings screen
      // maps styles are specific to the maps screen!
      // The styles needed to be separated out due to the way the page
      // displays the maps - the global styles above did not render
      // correctly
      adjustedHeaderContainer: {
        flex: .1,
        flexDirection: 'row',
        alignItems: 'flex-start'
      },

      adjustedContentContainer: {
        flex: .9,
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
      },

      adjustedMenuIcon: {
        marginTop:15,
        marginLeft: 8
      },

      adjustedHeaderText: {
        fontSize: 40,
        marginLeft: 5,
        fontWeight: "bold",
        justifyContent: "center",
        marginTop: 4,
      },

      mapsButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
      },

      mapsButton: {
        margin: 15,
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 30,
      },

      // Style for the buttons displayed on the home page
      homePagecontainer: {
        flex: 1,
        backgroundColor: '#FFFFFF50',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: ( Platform.OS === 'android' ) ? 0 : 0,
        paddingBottom: 5,
      },
      
      homePageContentContainer: {
        flex: 0.90,
        alignItems: 'center'
      },

      homePageUpperContainer: {
        flex: 0.2,
        flexDirection: 'column',
      },
      
      homePageButtonContainer: {
        flex: 0.8,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },

      homePageButton: {
        margin: 15,
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 30,
      }
})