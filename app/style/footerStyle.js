import { StyleSheet, Platform, Dimensions } from "react-native";
import * as FontSizes from '../utils/fontsSizes';
const deviceHeight = Dimensions.get("window").height;

export default footerStyle = StyleSheet.create({
    footerView: {
       // flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#7b7b7b',
        paddingTop: 10,
        paddingBottom: 10,
    },
    footerText: {
        color: '#727272',
        fontSize: FontSizes.small
    },
    footerFirstText: {
        color: '#727272',
        fontSize: FontSizes.medium
    },
    footerCopyRightsText: {
        color: '#727272',
        fontSize: FontSizes.small
    }
});
