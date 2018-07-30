import React from 'react';

import { DrawerNavigator } from 'react-navigation';

// Components

import SideBar from '../Sidebar/Sidebar';
import VOD from '../../containers/VOD';

import Globals from '../../constants/Globals';
import { Platform, Dimensions } from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
// Styles

// Other data/helper functions

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
