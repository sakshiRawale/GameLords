import { StyleSheet, Dimensions, Platform } from "react-native";

const deviceHeight = Dimensions.get("window").height;

export default inputStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        height: Platform.OS == "ios" ? 30 : 45,
        marginTop: 0,
        backgroundColor: 'transparent'
    },
    icon: {
        color: "white",
        fontSize: 24,
        width: 30
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginRight: 5
    },
    input: {
        fontSize: 18,
        height: Platform.OS == "ios" ? 20 : 40,
        color: "white",
        marginTop: Platform.OS == "ios" ? 5 : null,
        paddingVertical: 0,
        width: '100%'
    },
});
