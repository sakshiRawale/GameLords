import { StyleSheet, Dimensions } from  'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default bannerStyles = StyleSheet.create({
    indicatorViewPage: {
        width: deviceWidth,
        // height: deviceHeight / 3,
    },
    bannerImage: {
        width: deviceWidth,
        height:"100%"
    },
    bannerText: {
        flex: 1,
        justifyContent: 'center',
    }
});
