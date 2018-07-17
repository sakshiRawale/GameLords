import { StyleSheet, Platform, Dimensions } from "react-native";
import * as FontSizes from '../utils/fontsSizes';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

export default StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },

    gameListBox: {
      height: Globals.DeviceType === 'Phone'? 42 : 62,
      flexDirection: 'row',
      alignItems: 'center',
      color:"white",
      borderBottomColor:"#f4aa1c",
      borderBottomWidth:1,
      // width: '88%',
    },
    transformView:{
      flexDirection: 'row',
      alignItems:"center",
      backgroundColor:"#f4aa1c",
      height:"100%",
      paddingRight: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  12 :  12) :  15) : 20
    },
    iconStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: 10
    },
    headingText: {
      color: '#423620',
      fontWeight: '600',
      fontSize: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  FontSizes.medium :  FontSizes.medium) :  FontSizes.medium) : FontSizes.large,
    },
    viewAllStyle: {
      transform: Platform.OS == "ios" ? [{skewX: "30deg"}] :  [{skewY: "30deg"}, {rotate: '135deg'}],
      width: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  '15%' :  '15%') :  '15%') : '10%',
      backgroundColor:"#f4aa1c",
      // backgroundColor:"red",
      marginLeft: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  -12 :  -12) :  -14) : -18, //Platform.OS == "ios" ? -18 :  -27,
      height: '100%',
    },
    noSearchText: {
      color: '#fff',
      marginTop: 20,
      alignSelf: 'center',
      fontSize: Globals.DeviceType == 'Phone' ? FontSizes.large : FontSizes.xLarge,
    }
});
