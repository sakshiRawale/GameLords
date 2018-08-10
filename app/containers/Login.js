import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { TouchableOpacity, View, TouchableHighlight, TextInput, Text, Image, ImageBackground, AsyncStorage, KeyboardAvoidingView, Platform } from "react-native";

// Components
import Input from '../components/Input/Input';
import Loader from '../components/Loader/Loader';
import NavigationService from '../utils/NavigationService';

// Styles
import { styles } from "../style/appStyles";
import loginStyles from "../style/loginStyles";

// Actions
import { checkAccess } from '../actions/WelcomeActions';
import { show, hide } from '../actions/ActivityIndicatorActions';

// Other data/helper functions
import { background, logo } from "../assets/Images";
import { console_log } from "../utils/helper";
import * as vars from '../constants/api';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation';
import { PaymentAndroid } from '../components/Payment/PaymentAndroid';
import { PaymentIOS } from '../components/Payment/PaymentIOS';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessCode: '',
            error: ''
        };
    }

    componentWillMount() {
        Orientation.lockToPortrait();
    }
    componentDidMount() {
        SplashScreen.hide();
    }

    getAccessToken = () => {
        if (this.state.accessCode !== '') {
            const url = vars.BASE_API_URL_GL + `/checkAccess?uid=${this.state.accessCode.toLowerCase()}`;
            this.props.show();
            axios.get(url)
                .then(res => {
                    if (res.data.success === true) {
                        this.props.checkAccess(res.data.data.token);
                        AsyncStorage.setItem('@AccessToken:key', res.data.data.token);
                        NavigationService.reset("DrawerVOD");
                    } else {
                        this.setState({ error: 'Please fill valid Access Code' });
                        this.props.hide();
                    }
                })
        } else {
            this.setState({ error: 'Please fill valid Access Code' });
        }
    }

    inAppPayment = () => {
        if (Platform.OS === 'ios') {
            PaymentIOS();
        }
        else {
            PaymentAndroid(
                (data) => {
                    if (data.purchaseState === 'PurchasedSuccessfully') {
                        this.setState({ accessCode: 'fdf098fcc6' });
                        this.getAccessToken();
                    }
                },
                (error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={loginStyles.content} behavior={Platform.OS == 'ios' ? 'padding' : ''}>
                <ImageBackground source={background} style={{ flex: 1 }}>
                    <View style={loginStyles.logoView}>
                        <Image source={logo} style={loginStyles.logo} />
                    </View>
                    <View style={loginStyles.inputView}>
                        <Text style={[styles.avRegular, loginStyles.userNameText]}>ACCESS CODE</Text>
                        <View style={loginStyles.usernameView}>
                            {(this.state.error != '') ?
                                <Text style={[loginStyles.errorStyles]}>{this.state.error}</Text>
                                : null}
                            <TextInput
                                value={this.state.accessCode}
                                style={[styles.avRegular, loginStyles.inputV]}
                                onChangeText={(accessCode) => this.setState({ accessCode })}
                                keyboardType={"default"}
                                defaultValue={this.state.accessCode}
                                maxLength={40}
                                multiline={false}
                                autoCapitalize="none"
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>
                    <View style={loginStyles.loginButtonView}>
                        <TouchableHighlight underlayColor="transparent" activeOpacity={0.6} onPress={() => this.getAccessToken()}>
                            <View style={loginStyles.loginButton}>
                                <Text style={[loginStyles.buttonText, styles.avRegular]}>
                                    {'CONTINUE'}
                                </Text>
                            </View>
                        </TouchableHighlight>

                        {
                            Platform.OS != "ios" &&
                            <TouchableOpacity style={loginStyles.newUser} onPress={() => this.inAppPayment()}>
                                <Text style={{ color: '#fff' }}>{"New User?"}
                                    <Text style={{ color: 'red' }}>{" Subscribe here"}</Text>
                                </Text>
                            </TouchableOpacity>
                        }

                    </View>
                </ImageBackground>
                <Loader visible={this.props.loader.isLoading} />
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        access: state.WelcomeReducer,
        loader: state.ActivityIndicatorReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        show,
        hide,
        checkAccess,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
