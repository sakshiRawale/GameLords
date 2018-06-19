import React, { Component } from "react";
import { View, Text, TextInput, AsyncStorage, NetInfo, Alert, Dimensions, ImageBackground, Platform } from "react-native";
import { Provider } from "react-redux";
import { StackNavigator } from "react-navigation";

// Components
import SplashScreen from "./app/containers/SplashScreen";
import { splashBg, background } from "./app/assets/Images";
import Login from "./app/containers/Login";
import DrawerVOD from "./app/components/Navigator/DrawerVOD";


// Styles
import { styles } from "./app/style/appStyles";

// Other data/functions
import store from "./app/store/configureStore";

import NavigationService from "./app/utils/NavigationService";
import Globals from './app/constants/Globals';

Text.defaultProps.allowFontScaling=false;
TextInput.defaultProps.allowFontScaling=false;

const RootNavigator = StackNavigator({
    Welcome: {
        screen: SplashScreen,
        navigationOptions: {
            header: null
        }
    },
    Login: {
      screen: Login,
      navigationOptions: {
          title: 'Access Id',
          header: null,
          gesturesEnabled: true
      }
    },
    DrawerVOD: {
        screen: DrawerVOD,
        navigationOptions: {
            title: 'DrawerVOD',
            header: null,
            gesturesEnabled: true
        }
    },
});

export default class GameLordAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentWillMount() {
        Globals.url =  'http://uk.mobiotv.com';
        Globals.lang = "spanish";
        NetInfo
            .getConnectionInfo()
            .then((connectionInfo) => {
                if (connectionInfo.type === "none") {
                    Alert.alert('GameLordAdmin', "Please check your Internet Connection");
                }

            });
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({isLoading: false});
        },1000)
    }

    render() {
        return(
            Platform.OS === 'ios' ?
                <Provider store={store}>
                    <RootNavigator ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}/>
                </Provider>
                :
                this.state.isLoading ?
                    <ImageBackground style = {{flex:1, width : window.width,height: window.height}} source = {splashBg}></ImageBackground>
                :
                    <Provider store={store}>
                    <RootNavigator ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}/>
                </Provider>
        )

    }

};
