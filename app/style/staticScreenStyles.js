import { StyleSheet, Dimensions, Platform } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default staticScreenStyles = StyleSheet.create({
    staticView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 80,
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    staticLogo: {
        width: deviceWidth * 0.6,
        resizeMode: 'contain',
        marginTop: 40,
        alignSelf: 'center'
    },
    textDataHeader: {
        color: '#ffffff',
        textAlign: 'left',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 5
    },
    textData: {
        color: '#ffffff',
        textAlign: Platform.OS === 'ios' ? 'justify' : 'left',
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 10,
    },
    pointerView: {
        flexDirection: 'row'
    },
    pointerIcon: {
        width: '10%',
        textAlign: 'right',
        padding: 8
    },
    textDataPointers: {
        color: '#ffffff',
        textAlign: Platform.OS === 'ios' ? 'justify' : 'left',
        fontSize: 14,
        width: '90%'
    }
});