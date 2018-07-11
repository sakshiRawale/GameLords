import {StyleSheet, Dimensions, Platform} from 'react-native';
import * as FontSizes from '../utils/fontsSizes';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

export default headerStyle = StyleSheet.create({
    header: {
        backgroundColor: '#000000',
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        height: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  80 :  65) :  45) : 75,
    },
    title: {
        color: 'white',
        fontSize: Globals.DeviceType === 'Phone'? FontSizes.large : FontSizes.xLarge,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 50
    },
    logo: {
        height: Globals.DeviceType === 'Phone'? '50%': '70%',
        resizeMode: 'contain',
        justifyContent: 'center',
    },
    titleView: {
        flex: 4,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    leftIconView: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    iconsView: {
        width: '78%',
        paddingTop: 10,
        paddingBottom: 10,
        //backgroundColor:'red'
    },
    rightIconView: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    rightText: {
        color: 'white',
        fontSize: FontSizes.small,
        textAlign: 'left',
        justifyContent: 'center'
    },
    headerBg: {
        marginTop: Platform.OS == "ios" ? ((deviceHeight == 812) ? 35 : 20) : 0,
        flexDirection: 'row',
        width: '100%',
    },
    headerSearch: {
        marginTop: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  35 :  20) :  0) : 30,
        flexDirection: 'row',
        backgroundColor: '#000',
        borderColor: '#ffa507',
        borderWidth: 1,
        borderRadius: Globals.DeviceType === 'Phone'? 3 : 6,
        width: Globals.DeviceType === 'Phone'? '83%' : '87%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Globals.DeviceType === 'Phone'? 3 : 10,
        height: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  '50%' :  '60%') :  '80%') : '80%',
    },
    btn: {
        marginTop: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  35 :  20) :  0) : 30,
        width: Globals.DeviceType === 'Phone'? '20%' : '15%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  '50%' :  '60%') :  '60%') : '80%',
    },
    cancelTxt: {
        color: '#ffa507',
        fontSize: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  FontSizes.medium :  FontSizes.medium) :  FontSizes.medium) : FontSizes.large,
    },
    searchTxt: {
        color: '#fff',
        width: Globals.DeviceType === 'Phone'? '80%': '90%',
        marginLeft: 5,
        height: '100%',
        fontSize: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  FontSizes.medium :  FontSizes.small) :  FontSizes.small) : FontSizes.large,
    },
    searchIcn: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: Globals.DeviceType === 'Phone'? 5 : 41
    },
    cancelIcon: {
      width: Globals.DeviceType === 'Phone'? 15: 25,
      height: Globals.DeviceType === 'Phone'? 15: 25,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      // marginRight: Globals.DeviceType === 'Phone'? 10: 45,
    }
});
