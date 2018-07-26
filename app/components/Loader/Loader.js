import React from "react";
import { View, Dimensions, WebView, Platform } from "react-native";

const window = Dimensions.get("window");
const loaderHTML = require('../../assets/html/loader.html');

const Loader = props => {
    if (props.visible == true) {
        return (
            <View style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10000,
                alignItems: "center",
                position: "absolute",
                justifyContent: "center",
                backgroundColor: "transparent"
            }}>
                <WebView source={Platform.OS === 'ios' ? loaderHTML : { uri: "file:///android_asset/loader.html" }} style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height, backgroundColor: 'transparent' }} javaScriptEnabled={true}
                    domStorageEnabled={true} />
            </View>

        );
    } else {
        return null;
    }
};

export default Loader;
