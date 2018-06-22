import { StyleSheet, Dimensions, Platform } from "react-native";
import * as FontSizes from '../utils/fontsSizes';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

export default vodStyle = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    allCategory: {
        color: 'white',
        fontSize: FontSizes.medium
    },
    categoryName: {
        color: '#d51a92',
        fontSize: FontSizes.large
    },
    favoriteSwitchText: {
        color: 'white',
        fontSize: FontSizes.medium
    },
    browseAll: {
        color: '#d51a92',
        fontSize: FontSizes.large
    },
    sliderView: {
        height: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceHeight / 3 :  deviceHeight / 2.7 ) :  deviceHeight / 3) : deviceHeight / 2.7, //Globals.DeviceType === "Phone" ? deviceHeight / 3.0 :  deviceHeight / 3.8

    },
    imageThmbnail: {
        width: deviceWidth / 2.8,
        height: deviceHeight / 3.4,
        backgroundColor: 'transparent',
        marginBottom: 30,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    tvThmbnail: {
        width: deviceWidth / 1.5,
        height: deviceHeight / 4.5,
        backgroundColor: 'transparent',
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    imageBackground: {
        width: deviceWidth / 2.8,
        height: '100%'
    },
    tvImageBackground: {
        width: deviceWidth / 1.5,
        height: '100%'
    },
    favoriteView: {
        height: 25,
        width: 25,
        borderRadius: 20,
        backgroundColor: '#00000090',
        marginLeft: deviceWidth / 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tvFavoriteView: {
        height: 25,
        width: 25,
        borderRadius: 25,
        backgroundColor: '#00000090',
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tvFavoriteBg: {
        height: 40,
        width: 40,
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorViewPage: {
        height: deviceHeight / 3.8,
    },
    videoTitleView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 5
    },
    videoTitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'left',
        paddingLeft: 5,
        flex: 1,
    },
    videoDurationView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    videoDuration: {
        fontSize: 16,
        color: 'white',
        paddingRight: 5,
        paddingBottom: 5
    },
    bannerText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '3%',
        width: '80%'
    }
});
