import React from 'react';

import { DrawerNavigator } from 'react-navigation';

// Components

import SideBar from '../Sidebar/Sidebar';
import VOD from '../../containers/VOD';

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
            activeTintColor: "#e91e63"
        },
        contentComponent: SideBar
    }
);

export default DrawerVOD;
