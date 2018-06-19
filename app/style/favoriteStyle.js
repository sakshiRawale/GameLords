import { StyleSheet, Platform, Dimensions } from "react-native";
import * as FontSizes from "../utils/fontsSizes";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

export default favoriteStyles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    renderContent: {
        paddingLeft: '4%',
        paddingRight: '4%',
        //flex: 1,
        flexDirection: 'row'
    },
    renderContentNew: {
        paddingLeft: '4%',
        paddingRight: '4%'

    },
    imageVideoThmbnail: {
        width: Globals.DeviceType === 'Phone'? deviceWidth / 3.2 : deviceWidth / 4.2,
        height: Globals.DeviceType === 'Phone'?  deviceHeight / 3.4 : deviceWidth / 3.6,
        backgroundColor: 'transparent',
        marginBottom: 30,
        marginLeft: Globals.DeviceType === 'Phone'?  6 : 8,
        //marginRight: 6,
        flexDirection: 'row',
        alignItems: 'stretch',
        overflow: 'hidden'
    },
    noChannelsViewTitle: {
        width: Platform.OS === 'ios' ? deviceWidth / 1.3 : deviceWidth / 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: '2%'
    },
    noChannelsViewDesc: {
        paddingTop: '5%',
        paddingBottom: '5%',
        width: Platform.OS === 'ios' ? deviceWidth / 1.4 : deviceWidth / 1.3,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    exploreButtonView: {
        alignItems: 'center',
        marginTop: '4%',
        paddingBottom: 20
    },
    exploreButton: {
        backgroundColor: '#f7843e',
        width: deviceWidth / 1.8,
        alignItems: 'center',
        flexDirection: 'row',
        height: Globals.DeviceType == 'Phone' ? 40 : 60,
        borderRadius: Globals.DeviceType == 'Phone' ? 15 : 25,
        justifyContent: 'center'
    },
    exploreVideoButton: {
        backgroundColor: '#d51a92',
        width: deviceWidth / 1.8,
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        borderRadius: 15,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: FontSizes.xLarge
    },
    tabStyle: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    },
    VODSelected: {
        borderBottomColor: '#d51a92',
        borderBottomWidth: 2,
    },
    VODDeselected: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
    },
    liveChannelSelected: {
        borderBottomColor: '#f7843e',
        borderBottomWidth: 2,
    },
    liveChannelDeselected: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#606060',
        borderBottomWidth: 1,
        //paddingBottom: '3%'
    },
    favoriteItemImage: {
        flex: 6,
        //overflow: 'hidden',
        marginTop: '3%',
        marginBottom: '3%',
        //backgroundColor: 'red'
    },
    favoriteItemImageB: {
        width: '100%',
        height: Globals.DeviceType == 'Phone' ? 85 : 135
    },
    favoriteItemImageInnerView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    favouriteItemLogoWrapperView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 20
    },
    favoriteItemChannelLogo: {
        width: '65%',
        height: '65%',
        resizeMode: 'contain',
    },
    favoriteItemTitle: {
        color: 'white',
        paddingLeft: '5%',
        fontSize: FontSizes.medium
    },
    favouriteHeartIcon: {
        backgroundColor: 'transparent',
        marginBottom: 40,
        //position: 'relative'
    },
    noData: {
        color: '#a7a5a7',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    noDataSubHeader: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    favLiveChannel: {
        flex: 6,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: '3%'
    },
    favoriteTitle: {
        flex: 7,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '3%',
        paddingTop: '0%',
        paddingBottom: '10%'
    },
    favoriteContentView: {
        minHeight: deviceHeight - 260
    }
});
