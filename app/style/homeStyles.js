import { StyleSheet, Dimensions, Platform } from "react-native";
import * as FontSizes from '../utils/fontsSizes';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default homeStyles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#000000"
    },
    imageContainer: {
        position: "absolute",
    },
    logoContainer: {
        flex: 1,
        marginTop: deviceHeight / 8,
        marginBottom: 30,
    },
    logo: {
        position: "absolute",
        left: Platform.OS === "android" ? 40 : 50,
        top: Platform.OS === "android" ? 35 : 60,
        width: 280,
        height: 100,
    },
    text: {
        color: "#D8D8D8",
        bottom: 6,
        marginTop: 5
    },
    imageView: {
        flex: 3,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    buttonView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 40
    },
    footerView: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#7b7b7b'
    },
    homePageButton: {
        width: deviceWidth / 1.3,
        alignItems: 'center',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center'
    },
    liveTvButton: {
        backgroundColor: '#f88f46'
    },
    iconLiveTv: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        position: 'absolute',
        left: 20
    },
    VODbutton: {
        backgroundColor: '#f00b64'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: FontSizes.large,
        letterSpacing: 2
    },
    subButtonsView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        width: deviceWidth / 1.2,
    },
    subButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
    bannerText: {
        fontSize: FontSizes.large,
        color: 'white',
        alignItems: 'center',
        textAlign: 'center'
    },
    subButtonsText: {
        color: 'white',
        paddingLeft: 10,
        fontSize: 14,
        letterSpacing: 1
    }
});
