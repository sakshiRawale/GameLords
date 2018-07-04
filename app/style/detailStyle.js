import { StyleSheet, Platform, Dimensions } from "react-native";
import * as FontSizes from "../utils/fontsSizes";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

export default detailStyle = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000000'
    },
    gameListBox: {
      height: 35,
      flexDirection: 'row',
      backgroundColor: '#000000',
      alignItems: 'center',
      width: '100%',
      alignSelf: 'center'
    },
    transformView:{
      flexDirection: 'row',
      alignItems:"center",
      width:'44%',
      height:"100%",
      paddingLeft: 20
    },
    iconStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: 15
    },
    headingText: {
      color: '#423620',
      fontSize: 14,
      fontWeight: '600',
      fontSize: FontSizes.medium,
      paddingHorizontal: 10
    },
    viewAllStyle: {
      transform: Platform.OS == "ios" ? [{skewX: "30deg"}] :  [{skewY: "30deg"}, {rotate: '45deg'}],
      width: Platform.OS == "ios" ? '22%' :  '20%',
      backgroundColor:"#f4aa1c",
      marginLeft: Platform.OS == "ios" ? -10 :  -27,
      height: '100%'
    },
    imageGameStyle: {
      height: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  220 :  175) :  175) : 250,
      width: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  155 :  175) :  175) : 160,
      borderRadius: 10,
    },
    detailViewStyle: {
      paddingBottom: 10,
    },
    gameTextStyle: {
      color: '#FFFFFF',
      fontSize: FontSizes.xLarge,
      fontWeight: '600',
    },
    gameDetailTextStyle: {
      color: '#FFFFFF',
      fontSize: FontSizes.small,
    },
    relatedStyle: {
      backgroundColor: '#000000',
      flexDirection: 'row',
      paddingHorizontal: 20
    },
    iconRatingStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: 2,
      paddingVertical: 2
    },
    gameDetailsView: {
      paddingVertical: 20,
    },
    gameDetailsViewCol: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    gameDetailsViewLeft:{
      width: '28%',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    gameDetailsViewRight:{
      width: '72%',
      paddingHorizontal: 10
    },
    gameDetailsDescription:{
      textAlign: 'justify',
    },
    gameDetailsViewFavRate: {
      width: '60%',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    gameFavRateIcon: {
      zIndex:1,
      paddingHorizontal: 25
    },
    gameFavRateText: {
      marginRight: 25
    },
    viewAllViewStyle: {
      flexDirection: 'row',
      width: '56%',
      justifyContent: 'center',
    },
    browseAll: {
        color: '#f4aa1c',
        fontSize: FontSizes.medium,
        fontWeight: '600'
    },
    gameDetailPlayGameTextStyle: {
      color: '#FFFFFF',
      fontSize: FontSizes.xLarge,
    },
    gamePlayGameViewCol: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    gamePlayGameView: {
      width: Globals.deviceWidth/1.8,
      paddingVertical: 20,
      justifyContent: 'center',
      backgroundColor: '#a92d2d',
      alignItems: 'center',
      borderRadius: 10
    },
    gameDetailsViewPlayGameRight:{
      alignItems: 'center',
    },
    gameViewAllView: {
      paddingVertical:10,
      borderBottomWidth:1,
      width: '80%',
      borderBottomColor:"#f4aa1c",
      paddingRight: 20
    },
    gameViewAllText: {
      justifyContent: "center",
      alignItems: 'center'
    },
    gameDetailView: {
      flex: 3,
      width: '100%',
      backgroundColor: 'rgba(0,0,0, 0.8)',
      paddingTop: 15
    }
});
