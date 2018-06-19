import { StyleSheet, Dimensions } from  'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default smartTVStyles = StyleSheet.create({
    smartTVView: {
        flex: 1
    },
    contentView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    itemView: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        //paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        borderWidth: 1,
        borderBottomColor: "#a4b7c1",
    },
    listView: {
        minHeight: deviceHeight - 175
    },
    imageBackground: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 75
    },
    channelLogo: {
        width: "65%",
        height: '45%',
        resizeMode: 'contain',
    },
    channelLogoTvGuide: {
        width: "35%",
        height: '35%',
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: '10%'
    },
    bgOpacity: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    bgOpacityTvGuide: {
        flex:1,
        backgroundColor: 'rgba(191,133,55,.85)',
        position: 'absolute',
        width: '100%',
        height: '100%'
},
    textData: {
        flex: 2,
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5,
    },
    firstLayer: {
        flexDirection: 'row'
    },
    leftHalf: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    nowStreaming: {
        color: "#ffffff",
        fontSize: 10
    },
    programName: {
        color: "#ffffff",
        fontSize: 13
    },
    rightHalf: {
        flex: 1
    },
    viewAll: {
        fontSize: 12,
        color: "#ed145b",
        textAlign: 'right'
    },
    upNext: {
        color: "#ffffff",
        fontSize: 10,
        textAlign: 'right'
    },
    programNameNext: {
        color: "#ffffff",
        fontSize: 13,
        textAlign: 'right'
    },
    secondLayer: {
        marginTop: 5,
        marginBottom: 5,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#363636"
    },
    progressBar: {
        width: '36%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: "#ed145b"
    },
    thirdLayer: {
        flexDirection: 'row',
        marginTop: '10%'
    },
    startTime: {
        flex: 1,
        color: "#ffffff",
        fontSize: 11,
        textAlign: 'left'
    },
    endTime: {
        flex: 1,
        color: "#ffffff",
        fontSize: 11,
        textAlign: 'right'
    },
    imageContainer: {
        position: "absolute",
    },
    bannerText: {
        color: 'black',
        alignSelf: 'center',
        marginTop: '28%',
        fontSize: 15,
        marginLeft: '33%'
    },
    imageView: {
        height: '45%',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    tvFavoriteView: {
        height: 25,
        width: 25,
        borderRadius: 20,
        backgroundColor: '#00000090',
        marginLeft: '20%',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});