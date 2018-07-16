import { StyleSheet, Dimensions, Platform } from  'react-native';
import * as FontSizes from '../utils/fontsSizes';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

export default bannerStyles = StyleSheet.create({
    indicatorViewPage: {
        flex: 1,
        width: deviceWidth,
        // borderColor: 'red', borderWidth: 2
        // height: deviceHeight / 3,
    },
    bannerImage: {
        width: deviceWidth,
        height: "100%"
    },
    bannerText: {
        flex: 1,
        justifyContent: 'center',
    }
});
