//Globally access variable

import { Dimensions } from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

module.exports = {
    url : '',
    type: 'es',
    deviceHeight: deviceHeight,
    DeviceType: (deviceHeight / deviceWidth) > 1.6 ? 'Phone' : 'Tablet',
    IphoneX: deviceHeight == 812 ? true : false
};
