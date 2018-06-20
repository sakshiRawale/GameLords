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
        height: Platform.OS == "ios" ? ((deviceHeight == 812) ? 95 : 65) : 45
    },
    title: {
        color: 'white',
        fontSize: FontSizes.large,
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
        marginTop: Platform.OS == "ios" ? ((deviceHeight == 812) ? 35 : 20) : 5,
        flexDirection: 'row',
        backgroundColor: '#000',
        borderColor: '#ffa507',
        borderWidth: 1,
        borderRadius: 3,
        width:  Globals.DeviceType === 'Phone'? '80%': '85%',
        height: Platform.OS == "ios" ? '60%' : '85%',
        marginLeft: 10
    },
    btn: {
        marginLeft: 10,
        marginTop: Platform.OS == "ios" ? ((deviceHeight == 812) ? 15 : 5) : 0,
        width: '20%',
        height: '100%'
    },
    cancelTxt: {
        color: '#ffa507',
        fontSize: FontSizes.small,
    },
    searchTxt: {
        color: '#fff',
        width: Globals.DeviceType === 'Phone'? '80%': '90%',
        marginLeft: 5,
        height: '100%',
        fontSize: FontSizes.small,
    },
    searchIcn: {
        marginTop: Platform.OS == "ios" ? ((deviceHeight == 812) ? 15 : 7) : 7,
        marginLeft: 5
    },
});
