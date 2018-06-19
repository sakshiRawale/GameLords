import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as FontSizes from '../utils/fontsSizes';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';


export default channelListStyle = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        paddingTop: 15
    },
    contentContainer: {
        paddingVertical: 20
    },
    categoryName: {
        color: '#d51a92',
        fontSize: FontSizes.large,
        paddingLeft: 15
    },
    favoriteSwitchText: {
        color: 'white',
        fontSize: FontSizes.large
    },
    imageThmbnail: {
        width: '47%',
        height: Globals.DeviceType === 'Phone' ?  deviceHeight / 6 : deviceHeight / 5,
        backgroundColor: '#fff',
        marginBottom: 30,
        marginLeft: 7,
        //marginRight: 5,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    videoTitle: {
        color: 'white',
        textAlign: 'left',
        paddingLeft: 5,
        flex: 1,
        fontSize: FontSizes.medium
    },
    videoTitleView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 2,
        //backgroundColor: 'red'
    },
    tvFavoriteView: {
        height: Globals.DeviceType === 'Phone' ?  25 : 35,
        width: Globals.DeviceType === 'Phone' ?  25 : 35,
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
    videoDuration: {
        fontSize: FontSizes.small,
        color: 'white',
        paddingRight: 3,
        marginLeft: 3,
        //marginTop: 1
    },
    videoDurationView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        //backgroundColor: 'red',
        marginBottom: 4
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    liveNow: {
        flex: 1, 
        flexDirection: 'row', 
        //alignItems: 'center',
        paddingBottom: '1%'
    }
});
