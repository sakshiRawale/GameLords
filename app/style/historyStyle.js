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
      height: 35,
      flexDirection: 'row',
      backgroundColor: 'black',
      alignItems: 'center',
      color:"white",
      borderBottomColor:"#f4aa1c",
      borderBottomWidth:1,
      width: '88%',

    },
    transformView:{
      flexDirection: 'row',
      alignItems:"center",
      backgroundColor:"#f4aa1c",
      width:'61%',
      height:"100%",
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
});
