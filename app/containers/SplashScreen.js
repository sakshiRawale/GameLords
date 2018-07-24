import React, { Component } from "react";
import { Animated, Image, View, Text, ImageBackground, AsyncStorage, Alert } from "react-native";
import { Container } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavigationService from '../utils/NavigationService';
import { checkAccess } from '../actions/WelcomeActions';
// Styles
import { styles } from "../style/appStyles";
import { splashScreenStyles } from "../style/splashScreenStyles";

// Other data/helper function
import { logo, background, splashBg } from "../assets/Images";
import { console_log } from "../utils/helper";
import Orientation from 'react-native-orientation';
import Globals from '../constants/Globals';

class SplashScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logoOpacity: new Animated.Value(1),
            isLoading: true,
            accessToken: ''
        }
    }
    componentDidMount() {
        Orientation.lockToPortrait();
        //Globals.type = 'uk';
        AsyncStorage
            .getItem("@AccessToken:key")
            .then((value) => {
            if (value !== null) {
                this.setState({accessToken: value, });
            } else {
                this.setState({accessToken: null, });
            }
        })
        .done();

         setTimeout(() => {
        this.setState({isLoading: false});
         },1000)
    }

    render() {
              if (this.state.isLoading) {
                return (
                    <ImageBackground style = {{flex:1, width : window.width,height: window.height}} source = {splashBg}></ImageBackground>
                        )
            } else {
                  if (this.state.accessToken !== null) {
                      NavigationService.reset("DrawerVOD");
                      this.props.checkAccess(this.state.accessToken);
                          return null;
                  } else {
                      NavigationService.reset("Login");
                      return null;
                  }
            }

    }
}


const mapStateToProps = (state) => {
    return {
        access: state.WelcomeReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        checkAccess,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
