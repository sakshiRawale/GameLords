import { StyleSheet, Dimensions, Platform } from "react-native";
const deviceHeight = Dimensions.get("window").height;
import * as FontSizes from '../utils/fontsSizes';
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

let posterHeight = (() => {
    if (Globals.DeviceType === 'Phone') {
        if (Platform.OS == "ios" && deviceHeight === 812) {
            return deviceWidth / 2.9;
        } else {
            return deviceHeight / 3.8;
        }
    } else {
        return deviceWidth / 3.4;
    }
})();

let posterWidth = (() => {
    if (Globals.DeviceType === 'Phone') {
        if (Platform.OS == "ios" && deviceHeight === 812) {
            return deviceWidth / 4;
        } else {
            return deviceWidth / 3;
        }
    } else {
        return deviceWidth / 4;
    }
})();


export default liveChannelStyle = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000000'
    },
    allCategory: {
        color: '#FFFFFF',
        fontSize: FontSizes.medium
    },
    categoryName: {
        color: '#d51a92',
        fontSize: FontSizes.large
    },
    favoriteSwitchText: {
        color: '#FFFFFF',
        fontSize: FontSizes.medium
    },
    browseAll: {
        color: '#f4aa1c',
        fontSize: Globals.DeviceType === 'Phone'?  FontSizes.medium : FontSizes.xLarge,
        fontWeight: '600'
    },
    bannerView: {
        height: deviceHeight / 3.9
    },


    imageThmbnailCategoryGames: {
        width: posterWidth,
        height: posterHeight,
        backgroundColor: 'transparent',
        marginVertical: 10,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'stretch',
    },

    imageThmbnailGames: {
        width: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceWidth / 2.5 :  deviceWidth / 2.45) :  deviceWidth / 2.45) : deviceWidth / 3.8,
        height: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceHeight / 4 :  deviceHeight / 3.2) :  deviceHeight / 3.2) : deviceHeight / 3.6,
        backgroundColor: 'transparent',
        marginVertical: Globals.DeviceType === 'Phone'? 20 : 25,
        flexDirection: 'row',
        alignItems: 'stretch',
        borderColor:'#555',
        borderWidth: 2,
    },
    setPaddingFavorite: {
      marginHorizontal: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  8.5 :  7) : 7) : 15,
    },
    setPaddingSlider: {
      marginRight: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  30 :  28) : 30) : 42,
    },
    imageThmbnailCategory: {
        height: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceHeight / 6.1 :  deviceHeight / 4.5) :  deviceHeight / 4.5) : deviceHeight / 5.2, //deviceHeight/4.5, // Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceWidth / 4.4 :  deviceWidth / 3.2) :  deviceWidth / 3.2) : deviceWidth / 4.8,
        width: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceWidth / 1.55 :  deviceWidth / 1.35) :  deviceWidth / 1.35) : deviceWidth / 2.2, //deviceWidth/1.35
        backgroundColor: 'transparent',
        marginBottom: Globals.DeviceType === 'Phone'? 40 : 60,
        flexDirection: 'row',
        alignItems: 'stretch',
    },

    imageBackground: {
        width: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceWidth / 4.4 :  deviceWidth / 3.2) :  deviceWidth / 3.2) : deviceWidth / 4.8,
        height: '100%',
    },

    imageGame: {
        height: '100%'
    },

    gameImageView: {
      marginHorizontal: Globals.DeviceType === 'Phone'? 10 : 14,
      marginVertical: Globals.DeviceType === 'Phone'? 10 : 14,
    },

    gameNameFavorite: {
      flexDirection: 'row',
      height: '15%',
    },
    imageBackgroundCategory: {
        width: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceWidth / 1.7 :  deviceWidth / 1.5) :  deviceWidth / 1.5) : deviceWidth / 2.4, //deviceWidth/1.5,
        height: '100%'
    },
    bannerText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '3%',
        width: '80%'
    },
    categoryNameText: {
      bottom: 0,
      right: 5,
      position: 'absolute',
      color: '#FFFFFF',
      zIndex: 4,
      fontWeight: 'bold',
      fontSize:  Globals.DeviceType === 'Phone'?  FontSizes.large : FontSizes.xLarge,
    },
    transformView:{
      flexDirection: 'row',
      backgroundColor: '#f4aa1c',
      paddingRight: Globals.DeviceType === 'Phone'? 15 : 20
    },
    gameListBox: {
      height: Globals.DeviceType === 'Phone'? 45 : 65,
      flexDirection: 'row',
      backgroundColor: '#000000',
      alignItems: 'center',
      borderBottomColor:"#f4aa1c",
      borderBottomWidth:1,
    },
    iconStyle: {
      alignSelf: 'center',
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
    },
    iconRatingStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: 2
    },
    headingText: {
      alignSelf: 'center',
      color: '#423620',
      fontWeight: '600',
      fontSize: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  FontSizes.medium :  FontSizes.medium) :  FontSizes.medium) : FontSizes.xLarge,
    },
    viewAllStyle: {
      transform: Platform.OS == "ios" ? [{skewX: "30deg"}] :  [{skewY: "30deg"}, {rotate: '135deg'}],
      width: Globals.DeviceType === 'Phone'? '15%' : '10%',
      // backgroundColor:"#f4aa1c",
      backgroundColor:"red",
      marginLeft: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  -12 :  -12) :  -18) : -18, //Platform.OS == "ios" ? -18 :  -27,
      height: '100%',
    },
    viewAllViewStyle: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      paddingRight: 10,
    },
    gameRatingIcon: {
      flexDirection: 'row',
      height: '15%'
    },
    gameTitleText: {
      color: '#fff',
      fontSize: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  FontSizes.large :  FontSizes.large) :  FontSizes.large) : FontSizes.xLarge,
    },
    gameView: {
      paddingTop: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  7 :  7) :  7) : 20,
      paddingBottom: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  28 :  28) :  28) : 50,
    }

});
