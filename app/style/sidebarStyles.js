import { StyleSheet, Platform, Dimensions } from "react-native";
import * as FontSizes from "../utils/fontsSizes";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

export default sidebarStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    sidebar: {
        flex: 1,
        backgroundColor: "#fff"
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    backgroundCover: {
        position: "absolute"
    },
    drawerCover: {
        height: deviceHeight / 3.5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#fff"
    },
    drawerImage: {
        width: 210,
        height: 75
    },
    icon: {
        color: "#777",
        fontSize: 26,
        width: 30
    },
    listItemContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    iconContainer: {
        width: 37,
        height: 37,
        borderRadius: 18,
        marginRight: 12,
        paddingTop: Platform.OS === "android" ? 7 : 5
    },
    sidebarIcon: {
        fontSize: 21,
        color: "#fff",
        lineHeight: Platform.OS === "android" ? 21 : 25,
        backgroundColor: "transparent",
        alignSelf: "center"
    },
    text: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 16,
        marginLeft: 20
    },
    badgeText: {
        fontSize: Platform.OS === "ios" ? 13 : 11,
        fontWeight: "400",
        textAlign: "center",
        marginTop: Platform.OS === "android" ? -3 : undefined
    },
    drawerView: {
        backgroundColor: "#000000",
        height: deviceHeight,
        flex: 1,
        flexDirection: "column"
    },
    avtarStyle: {
        marginTop: 50,
        width: deviceWidth / 2.9,
        height: deviceWidth / 2.9,
        // width:  Globals.DeviceType === 'Phone'? deviceWidth / 2.9 : deviceWidth / 3.6,
        // height:  Globals.DeviceType === 'Phone'? deviceWidth / 2.9 : deviceWidth / 3.6,
        borderWidth: 3,
        borderColor: "#ffffff",
        borderRadius: deviceWidth / 5.8,
        justifyContent: "center",
        alignSelf: "center",
        overflow: "hidden",
        backgroundColor: "transparent"
    },
    cover: {
        flex: 1,
        resizeMode: "cover"
    },
    menuView: {
        flex: 7,
        paddingTop: 30
    },
    userName: {
        color: "white",
        marginTop: 10,
        fontSize: FontSizes.xLarge,
        textAlign: "center"
    },
    menuStyle: {
        alignItems: "center",
        flexDirection: "row",
        height: deviceHeight / 15
    },
    menuText: {
        color: "white",
        fontSize: Globals.DeviceType === 'Phone'?  FontSizes.large : FontSizes.large,
        paddingLeft: 5
    },
    menuDividerStyle: {
      height: 1,
      backgroundColor: '#a58b50',
      marginTop: 6
    },
    iconView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingLeft: 10
    },
    menuTextView: {
        flex: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    notificationContainer: {
        flexDirection: "row",
        flex: 1,
        alignSelf: 'flex-end',
        backgroundColor: 'transparent'
    },
    notificationBadge: {
        backgroundColor: "#ed145b",
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: "center",
        marginLeft: 20
    },
    notificationTxt: {
        color: "#fff",
        marginTop: 6
    },
    notificationDownArow: {
        marginLeft: 20
    }
});
