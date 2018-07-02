import { StyleSheet, Platform, Dimensions } from "react-native";
import * as FontSizes from "../utils/fontsSizes";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

export default detailStyle = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    gameListBox: {
      height: 35,
      flexDirection: 'row',
      backgroundColor: 'black',
      alignItems: 'center',
      color:"#FFFFFF",
      borderBottomColor:"#f4aa1c",
      borderBottomWidth:1,
      width: '88%',
      alignSelf: 'center'
    },
    transformView:{
      flexDirection: 'row',
      alignItems:"center",
      backgroundColor:"#f4aa1c",
      width:'44%',
      height:"100%",
      paddingHorizontal: 8
    },
    iconStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: 15
    },
    headingText: {
      color: '#423620',
      fontSize: 14,
      fontWeight: '600',
      fontSize: FontSizes.medium
    },
    viewAllStyle: {
      transform: Platform.OS == "ios" ? [{skewX: "30deg"}] :  [{skewY: "30deg"}, {rotate: '45deg'}],
      width: Platform.OS == "ios" ? '10%' :  '20%',
      backgroundColor:"#f4aa1c",
      marginLeft: Platform.OS == "ios" ? -16 :  -27,
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
      backgroundColor: 'black',
      flexDirection: 'row',
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
      // paddingHorizontal: 15,
    },
});
