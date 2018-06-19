import { StyleSheet, Dimensions } from  'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const splashScreenStyles = StyleSheet.create({
    wrapperView: {
        flex: 1,
        alignItems: 'center'
    },
    backgroundImg: {
        flex: 1,
        //backgroundColor: 'black'
    },
    logo: {
        width: deviceWidth * 0.6,
        resizeMode: 'contain',
        marginTop: '50%'
    },
    subHeading: {
        marginTop: 5,
        fontSize: 18,
        color: 'white'
    }
});