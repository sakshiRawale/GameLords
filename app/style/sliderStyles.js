import { StyleSheet, Dimensions } from  'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default sliderStyles = StyleSheet.create({
    indicatorViewPage: {
        //height: deviceHeight / 3,
        width: deviceWidth,
        //backgroundColor: 'red'
        flex: 1
    },
    dots: {
        width: 8,
        height: 8,
        margin: 3,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ffffff',
        backgroundColor: 'rgba(0,0,0,.1)'
    },
    dotsActive: {
        width: 8,
        height: 8,
        margin: 3,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ffffff',
        backgroundColor: 'rgba(256,256,256,1)'
    },
    paginationStyle: {
        bottom: 5
    },
    slides: {
        width: deviceWidth,
        height: '100%',
    },
    sliderText: {
        textAlign: 'left',
        marginLeft: 17,
        color: 'white',
        fontSize: 22
    },
    bannerText: {
        flex: 1,
       // alignItems: 'flex-start',
        justifyContent: 'center',
        //paddingLeft: '1%',
        //width: '80%'
    }
});