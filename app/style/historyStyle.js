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
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    historyTitle: {
        flex: 3,
        alignItems: 'flex-start',
        paddingLeft: '2%',
        justifyContent: 'center'
       
    },
    imageBackgroundVOD:{
        width: Globals.DeviceType === 'Phone'? 75 : 122,
        height:  Globals.DeviceType === 'Phone'? 113 : 179,
        //marginLeft: 10
    },
    imageBackgroundVOD_BD:{
        width: Globals.DeviceType === 'Phone'? 105 : 162,
        height:  Globals.DeviceType === 'Phone'? 123 : 219,
        //marginLeft: 10
    },
    historyContent: {
        //minHeight: deviceHeight - 190,
        backgroundColor: 'black',
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    historyItemTitle: {
        color: 'white',
        fontSize: FontSizes.medium
    },
    historyItemDuration: {
        color: 'white',
        fontSize: FontSizes.xSmall,
        paddingTop: 4
    },
    imageBackground: {
        width: '100%',
        height: Globals.DeviceType == 'Phone' ? 85 : 135,
        alignItems: 'center',
        justifyContent:'center'
    },
    imageBackground_BD:{
        width: '100%', height:  Globals.DeviceType === "Phone"? 85 : 135, alignItems: 'center', justifyContent:'center'
    },
    channelLogo: {
        width: "55%",height: '55%',resizeMode: 'contain', marginTop: '17%', alignSelf:'center'
    },
    bgOpacity: {
        backgroundColor: 'rgba(0,0,0,.5)', width: '100%', height: '100%'
    },
});
