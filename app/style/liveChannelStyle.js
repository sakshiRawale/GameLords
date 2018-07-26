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
        color: '#f4aa1c',
        fontSize: 16,
        fontWeight: '600'
    },
    sliderView: {
        height: deviceHeight / 3.9
    },
    imageThmbnail: {
        width: posterWidth,
        height: posterHeight,
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'stretch'
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
        width: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceWidth / 2.6 : deviceWidth / 2.5) : deviceWidth / 2.5) : deviceWidth / 2.25,
        height: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceHeight / 3.8 : deviceHeight / 3) : deviceHeight / 3) : deviceHeight / 2.4,
        backgroundColor: 'transparent',
        marginVertical: 20,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        borderColor: '#555',
        borderWidth: 2
    },

    imageThmbnailCategory: {
        height: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceHeight / 4.7 : deviceHeight / 4.5) : deviceHeight / 3.2) : deviceHeight / 3.8, //deviceHeight/4.5, // Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceWidth / 4.4 :  deviceWidth / 3.2) :  deviceWidth / 3.2) : deviceWidth / 4.8,
        width: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceWidth / 1.20 : deviceWidth / 1.35) : deviceWidth / 3.2) : deviceWidth / 1.6, //deviceWidth/1.35
        backgroundColor: 'transparent',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'stretch',
    },

    imageBackground: {
        width: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceWidth / 4.4 : deviceWidth / 3.2) : deviceWidth / 3.2) : deviceWidth / 4.8,
        height: '100%',
    },

    imageGame: {
        height: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceHeight / 5.2 : deviceHeight / 4.2) : deviceHeight / 3.2) : deviceHeight / 3.2,
    },

    gameImageView: {
        marginHorizontal: Globals.DeviceType === 'Phone' ? 8 : 12,
        marginVertical: Globals.DeviceType === 'Phone' ? 8 : 12,
    },

    gameNameFavorite: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    imageBackgroundCategory: {
        width: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceWidth / 1.3 : deviceWidth / 1.5) : deviceWidth / 3.2) : deviceWidth / 1.75, //deviceWidth/1.5,
        height: '100%'
    },

    imageVideoThmbnail: {
        width: Globals.DeviceType === 'Phone' ? Platform.OS == "ios" ? ((deviceHeight == 812) ? deviceWidth / 4.4 : deviceWidth / 3.2) : deviceWidth / 3.2 : deviceWidth / 4.8,
        height: Globals.DeviceType === 'Phone' ? Platform.OS == "ios" ? ((deviceHeight == 812) ? deviceWidth / 2.9 : deviceHeight / 3.9) : deviceHeight / 3.9 : deviceWidth / 3.4,
        backgroundColor: 'transparent',
        marginBottom: 30,
        marginLeft: Globals.DeviceType === 'Phone' ? 6 : 25,
        //marginRight: 6,
        flexDirection: 'row',
        alignItems: 'stretch',
        overflow: 'hidden'
    },
    imageVideoListBackground: {
        width: Globals.DeviceType === 'Phone' ? Platform.OS == "ios" ? ((deviceHeight == 812) ? deviceWidth / 4.4 : deviceWidth / 3.2) : deviceWidth / 3.2 : deviceWidth / 4.8,
        //height: '100%',
        height: Globals.DeviceType === 'Phone' ? Platform.OS == "ios" ? ((deviceHeight == 812) ? deviceWidth / 2.9 : deviceHeight / 4) : deviceHeight / 4 : deviceWidth / 3.6,

    },
    imageSearchVideoThmbnail: {
        width: Globals.DeviceType === 'Phone' ? Platform.OS == "ios" ? ((deviceHeight == 812) ? deviceWidth / 4.4 : deviceWidth / 3.2) : deviceWidth / 3.2 : deviceWidth / 4.2,
        height: Globals.DeviceType === 'Phone' ? Platform.OS == "ios" ? ((deviceHeight == 812) ? deviceWidth / 2.9 : deviceHeight / 4) : deviceHeight / 4 : deviceWidth / 3.6,
        backgroundColor: 'transparent',
        marginBottom: 30,
        marginLeft: Globals.DeviceType === 'Phone' ? 6 : 8,
        //marginRight: 6,
        flexDirection: 'row',
        //alignItems: 'stretch',
        //overflow: 'hidden'
    },
    imageVideoListBackground_BD: {
        width: Globals.DeviceType === 'Phone' ? 110 : deviceWidth / 4.8,
        height: '100%'
    },
    imageSearchVideoThmbnail_BD: {
        width: Globals.DeviceType === 'Phone' ? 110 : deviceWidth / 4.2,
        height: Globals.DeviceType === 'Phone' ? 65 : deviceWidth / 3.6,
        backgroundColor: 'transparent',
        marginBottom: 30,
        marginLeft: Globals.DeviceType === 'Phone' ? 6 : 8,
        //marginRight: 6,
        flexDirection: 'row',
        alignItems: 'stretch',
        overflow: 'hidden'
    },
    tvThmbnail: {
        width: Globals.DeviceType === 'Phone' ? deviceWidth / 1.8 : deviceWidth / 2.8,
        height: Globals.DeviceType === 'Phone' ? deviceHeight / 5.2 : deviceHeight / 6,
        backgroundColor: 'transparent',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'stretch',
        borderColor: 'red',
        borderRadius: 10,
        overflow: 'hidden'
    },


    tvImageBackground: {
        width: Globals.DeviceType === 'Phone' ? deviceWidth / 1.8 : deviceWidth / 2.8,
        height: '100%',
        //resizeMode: 'center'
    },
    favoriteView: {
        height: Globals.DeviceType === 'Phone' ? 25 : 35,
        width: Globals.DeviceType === 'Phone' ? 25 : 35,
        borderRadius: 20,
        backgroundColor: '#00000090',
        marginLeft: '75%',
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    favoriteVideoView: {
        height: 25,
        width: 25,
        borderRadius: 20,
        backgroundColor: '#00000090',
        marginLeft: '65%',
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tvFavoriteView: {
        height: Globals.DeviceType === 'Phone' ? 25 : 35,
        width: Globals.DeviceType === 'Phone' ? 25 : 35,
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
    tvFavoriteVideoBg: {
        height: 40,
        width: 40,
        marginLeft: Globals.DeviceType === 'Phone' ? '60%' : '75%',
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
        fontSize: FontSizes.medium,
        fontWeight: '900',
        color: '#ffffff',
        textAlign: 'left',
        paddingLeft: 5,
        flex: 1
    },
    videoDurationView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    videoDuration: {
        fontSize: FontSizes.small,
        color: 'white',
        paddingRight: 5,
        paddingBottom: 4
    },
    bannerText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '3%',
        width: '80%'
    },
    liveNow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoryNameText: {
        bottom: 0,
        right: 5,
        position: 'absolute',
        color: 'white',
        zIndex: 4,
        fontWeight: 'bold',
    },
    transformView: {
        flex: 2,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#f4aa1c",
        width: '70%',
        height: "100%",

    }

});
