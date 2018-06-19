import { StyleSheet, Dimensions, Platform } from "react-native";
import * as FontSizes from '../utils/fontsSizes';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const DeviceType = (deviceHeight / deviceWidth) > 1.6 ? 'Phone' : 'Tablet';

export default playStyle = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    playButtonView: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 20
    },
    playButton: {
        backgroundColor: '#e50712',
        width: deviceWidth / 1.1,
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',    
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: FontSizes.large
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    shadow: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    watchLaterText: {
        color: 'white',
        paddingTop: 5,
        fontSize: FontSizes.xSmall
    },
    rateView: {
        alignItems: 'center',
        paddingLeft: DeviceType === 'Phone' ?  '1%' : '2%',
        flex: DeviceType === 'Phone' ?  2 : 1,
      //  backgroundColor : 'red'
    },
    rateText: {
        color: 'white',
        paddingTop: 5,
        fontSize: FontSizes.xSmall
    },
    descriptionView: {
        //alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingTop: '1%',
        width: '59%',
    },
    durationView: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: '1%'
    },
    durationText: {
        color: 'white',
        fontSize: FontSizes.xSmall
    },
    videoInfoView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2%'
    },
    infoTitle: {
        color: 'white',
        fontSize: FontSizes.small
    },
    infoContent: {
        color: '#8c8c8c',
        paddingLeft: '2%',
        fontSize: FontSizes.small
    },
    videoTitle: {
        color: 'white',
        textAlign: 'left',
        fontSize: FontSizes.large,
        fontWeight: '600',
       
    },
    backgroundVideo: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        height: 200
      },
});
