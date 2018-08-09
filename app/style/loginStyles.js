import { StyleSheet, Platform, Dimensions } from "react-native";
import * as FontSizes from '../utils/fontsSizes';
import Globals from '../constants/Globals';
const deviceWidth = Dimensions.get("window").width;

export default loginStyles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    logoView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logo: {
        width: Globals.DeviceType === 'Phone' ? '50%' : '60%',
        resizeMode: Globals.DeviceType === 'Phone' ? 'contain' : 'contain',
        //backgroundColor: 'red'
    },
    inputView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    usernameView: {
        marginTop: 10,
        alignItems: 'center',
        width: Globals.DeviceType === 'Phone' ? deviceWidth / 1.9 : deviceWidth / 2.5,
    },
    userNameText: {
        color: 'white',
        fontSize: FontSizes.medium,
        width: Globals.DeviceType === 'Phone' ? deviceWidth / 1.9 : deviceWidth / 2.5,
    },
    errorStyles: {
        width: '100%',
        color: '#cc0000',
        textAlign: 'left',
        fontSize: FontSizes.small,
    },
    inputV: {
        fontSize: FontSizes.medium,
        width: Globals.DeviceType === 'Phone' ? deviceWidth / 1.9 : deviceWidth / 2.5,
        height: Platform.OS == "ios" ? 20 : 40,
        color: "#ffffff",
        borderBottomColor: "#ffffff",
        borderBottomWidth: 1
    },
    loginButtonView: {
        flex: 1,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#f6a50e',
        width: Globals.DeviceType === 'Phone' ? deviceWidth / 1.9 : deviceWidth / 2.5,
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: FontSizes.xLarge
    },
    newUser:{
        marginTop: 20, 
        height: 40, 
        alignSelf:'center'
    }
});
