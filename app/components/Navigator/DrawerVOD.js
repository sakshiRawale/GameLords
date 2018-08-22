import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Platform, Dimensions } from "react-native";

// Components and Containers
import SideBar from '../Sidebar/Sidebar';
import VOD from '../../containers/VOD';

// Other data/helper functions
import Globals from '../../constants/Globals';

// Get Device Height and Width
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const DrawerVOD = DrawerNavigator(
    {
        VOD: {
            screen: VOD
        }
    },
    {
        initialRouteName: "VOD",
        contentOptions: {
            activeTintColor: "#e91e63",
        },
        contentComponent: SideBar,
        drawerWidth: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceWidth / 1.4 : deviceWidth / 1.4) : deviceWidth / 1.4) : Platform.OS == "ios" ?  deviceWidth / 1.8 : deviceWidth / 2,
    }
);

export default DrawerVOD;
