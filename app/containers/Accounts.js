import React, { Component } from "react";
import { BackHandler, CameraRoll, View, TouchableHighlight, TextInput, Text, Image, ImageBackground, ScrollView, TouchableOpacity, Keyboard, AsyncStorage } from "react-native";
import { Container, CheckBox } from "native-base";
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';
import Loader from '../components/Loader/Loader';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// Components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Input from '../components/Input/Input';
import NavigationService from '../utils/NavigationService';


// Styles
import { styles } from "../style/appStyles";
import accountStyles from "../style/accountStyles";
import Orientation from 'react-native-orientation';
// Other data/helper functions
import { background } from "../assets/Images";
import { timezones } from "../utils/timezones";
import * as vars from '../constants/api';
import { messages } from '../constants/messages';
import { show, hide } from '../actions/ActivityIndicatorActions';
import { showMessage } from '../actions/FlashMessageActions';
import { getDetails, setDetails, setProfilePic, getInterests } from '../actions/AccountActions';
import { setHeaderTitle } from '../actions/HeaderActions';
import { console_log, parseQueryString } from '../utils/helper';
import Globals from '../constants/Globals';
import { checkAccess } from '../actions/WelcomeActions';

const accountTypes = [
    { label: 'Standard' },
    { label: 'Premium' }
];
import MessageBar from '../components/Message/Message';
var ImagePicker = require('react-native-image-picker');
class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            emailAddress: '',
            location: '',
            error: '',
            selectedAccount: "premium",
            selectedTimezone: '-8:00',
            sportCategory: true,
            actionCategory: false,
            adventureCategory: true,
            fitnessCategory: false,
            entertainmentCategory: true,
            photo: '',
            photoFile: null,
            color: '',
            message: '',
            showMessage: false,
        }
    }

    componentWillMount() {
        let user = this.props.account.user;
        this.setState({
            name: user.name,
            emailAddress: user.email,
            location: user.address,
            interests: (user.userInterests) ? user.userInterests.map((i) => { return i.interestId }) : [],
            selectedAccount: user.accountType,
            selectedTimezone: user.timeZone
        });
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.show();
        setTimeout(() => {
            this.props.hide();
        }, 1500);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        NavigationService.goBack();
        return true;
    }

    editForm(e) {
        if (this.validateForm()) {
            Keyboard.dismiss();
            this.submitForm();
        }
    }

    validateForm() {
        let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.name == '') {
            this.props.showMessage({
                message: messages.nameEmpty,
                type: false
            });
            this.setState({ color: 'red', message: messages.nameEmpty, showMessage: !this.state.showMessage })
            return false;
        }
        if (this.state.emailAddress == '') {
            this.props.showMessage({
                message: messages.emailEmpty,
                type: false
            });
            this.setState({ color: 'red', message: messages.emailEmpty, showMessage: !this.state.showMessage })
            return false;
        }
        if (!regExp.test(this.state.emailAddress)) {
            this.props.showMessage({
                message: messages.emailNotValid,
                type: false
            });
            this.setState({ color: 'red', message: messages.emailNotValid, showMessage: !this.state.showMessage })
            return false;
        }
        if (this.state.location == '') {
            this.props.showMessage({
                message: messages.locationEmpty,
                type: false
            });
            this.setState({ color: 'red', message: messages.locationEmpty, showMessage: !this.state.showMessage })
            return false;
        }
        // if (this.state.interests.length != 5) {
        //     this.props.showMessage({
        //         message: messages.interests,
        //         type: false
        //     });
        //     this.setState({ color: 'red', message: messages.interests, showMessage: !this.state.showMessage })
        //     return false;
        // }
        return true;
    }

    submitForm() {
        this.props.show();
        let user = this.props.account.user;
        user.name = this.state.name;
        user.email = this.state.emailAddress;
        user.address = this.state.location;
        user.interests = this.state.interests;
        user.accountType = this.state.selectedAccount;
        user.timeZone = this.state.selectedTimezone;

        axios.put(vars.BASE_API_URL_GL + "/editProfile", user)
            .then((response) => {
                this.props.showMessage({
                    message: messages.profileSaved,
                    type: true
                });
                this.props.hide();
                this.setState({ color: 'green', message: messages.profileSaved, showMessage: !this.state.showMessage })
            })
            .catch((error) => {
                this.props.hide();
                console_log(error);
                console.log(error);
            });

        this.props.setDetails(user);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onCategoryChange(name) {
        let interest = this.state.interests,
            indexOf = interest.indexOf(parseInt(name));
        if (indexOf == -1) {
            interest.push(parseInt(name))
        } else {
            interest = interest.filter((c) => c !== parseInt(name));
        }

        this.setState({
            interests: interest
        });
    }

    onValueChange(value: string) {
        this.setState({
            selectedAccount: value
        });
    }

    changeSportCategory() {
        this.setState({ sportCategory: !this.state.sportCategory });
    }

    clickedButton() {
        this.props.rootNavigation.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
            })
        );
    }

    signOutUser(){
        this.props.checkAccess('');
        AsyncStorage.setItem('@AccessToken:key', '');
        NavigationService.reset("Login");
    }

    _OpenGallery() {
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Gallery' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                //console.log('User cancelled image picker');
            }
            else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.props.show();
                let source = { uri: response.uri };
                this.setState({
                    photo: source
                });

                const imageLoad = 'data:image/jpeg;base64,' + response.data;
                axios.post(vars.BASE_API_URL_PP + "/uploadProfilePic", { image: imageLoad })
                    .then((response) => {
                        this.setState({ color: 'green', message: messages.profilePic, showMessage: !this.state.showMessage })
                        this.props.setProfilePic(response.data.data.profilePic);
                        this.props.hide();
                    })
                    .catch((error) => {
                        this.props.hide();
                        console_log(error);
                    });
            }
        });
    };

    render() {
        return (
            <Container>
                <ImageBackground style={{ zIndex: 999 }}>
                    <Header
                        isDrawer={false}
                        isTitle={true}
                        title={'My Account'}
                        isSearch={false}
                        rightLabel={'SAVE'}
                        rightClick={this.editForm.bind(this)}
                    />
                </ImageBackground>
                <Loader visible={this.props.loader.isLoading} />
                <View style={accountStyles.content}>
                    <MessageBar showMessage={this.state.showMessage} color={this.state.color} message={this.state.message} />
                    <ScrollView contentContainerStyle={{ minHeight: Globals.IphoneX ? Globals.deviceHeight - 140 : Globals.deviceHeight - 80 }}>
                        <View style={[accountStyles.viewWrapper]}>
                            <View style={{ flex: 3, paddingTop: 20 }}>
                                <View>
                                    <View style={{ paddingBottom: '3%' }}>
                                        <Text style={[styles.avRegular, accountStyles.sectionHeaders]}>{"ACCOUNT DETAILS "}</Text>
                                    </View>
                                    <View style={accountStyles.inputView}>
                                        <Text style={[styles.avRegular, accountStyles.userNameText]}>{"NAME"}</Text>
                                        <View style={accountStyles.usernameView}>
                                            <TextInput
                                                value={this.state.accessCode}
                                                style={[accountStyles.input, { color: '#fff' }]}
                                                errorText={this.state.error}
                                                placeholderTextColor={'#606060'}
                                                onChangeText={(name) => this.setState({ name })}
                                                defaultValue={this.state.name}
                                                photoStyle={{ resizeMode: 'contain' }}
                                                maxLength={40}
                                                multiline={false}
                                                underlineColorAndroid={'transparent'}
                                            />
                                        </View>
                                    </View>
                                    <View style={[accountStyles.inputView, { marginTop: 20 }]}>
                                        <Text style={[styles.avRegular, accountStyles.userNameText]}>{"EMAIL ADDRESS"}</Text>
                                        <View style={accountStyles.usernameView}>
                                            <TextInput
                                                value={this.state.accessCode}
                                                style={[accountStyles.input, { color: '#fff' }]}
                                                errorText={this.state.error}
                                                placeholderTextColor={'#606060'}
                                                onChangeText={(email) => this.setState({ emailAddress: email })}
                                                defaultValue={this.state.emailAddress}
                                                photoStyle={{ padding: 10, resizeMode: 'contain' }}
                                                maxLength={40}
                                                multiline={false}
                                                underlineColorAndroid={'transparent'}
                                            />
                                        </View>
                                    </View>
                                    <View style={[accountStyles.inputView, { marginTop: 20 }]}>
                                        <Text style={[styles.avRegular, accountStyles.userNameText]}>{"LOCATION"}</Text>
                                        <View style={accountStyles.usernameView}>
                                            <TextInput
                                                value={this.state.accessCode}
                                                style={[accountStyles.input, { color: '#fff' }]}
                                                errorText={this.state.error}
                                                placeholderTextColor={'#606060'}
                                                onChangeText={(location) => this.setState({ location: location })}
                                                defaultValue={this.state.location}
                                                photoStyle={{ padding: 10, resizeMode: 'contain' }}
                                                maxLength={40}
                                                multiline={false}
                                                underlineColorAndroid={'transparent'}
                                            />
                                        </View>
                                    </View>
                                </View>

                                {(this.props.account.interests) ?
                                    <View style={{ paddingTop: '10%' }}>
                                        <View>
                                            <Text style={[styles.avRegular, accountStyles.sectionHeaders]}>{"INTERESTS"}</Text>
                                        </View>
                                        <View style={{ paddingTop: '7%' }}>
                                            <Text style={[styles.avRegular, accountStyles.sectionSubHeaders]}>{"CHOOSE YOUR GENRE"}</Text>
                                        </View>
                                        <View style={{ paddingLeft: '2%', marginBottom: 15 }}>
                                            {this.props.account.interests.map((interest, k) => {
                                                return (
                                                    <TouchableOpacity key={k}
                                                        onPress={this.onCategoryChange.bind(this, interest.interestId)}>
                                                        <View style={[accountStyles.radioView, { marginTop: k === 0 ? 5 : 0 }]}>
                                                            <CheckBox color='#496ebc'
                                                                checked={this.state.interests.indexOf(interest.interestId) !== -1 ? true : false} />
                                                            <Text
                                                                style={[styles.avRegular, accountStyles.categoryText]}>{interest.name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                            }
                                        </View>
                                    </View>
                                    :
                                    null
                                }
                                <View style ={{ height: 40,}}>
                                    <TouchableOpacity onPress={()=> this.signOutUser()}>
                                      <Text style={[styles.avRegular, accountStyles.sectionHeadersLogOut, {marginTop: 10, marginLeft: 5}]}>LOG OUT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 2 }}>
                                <TouchableOpacity style={accountStyles.avtarStyle} onPress={this._OpenGallery.bind(this)}>
                                    <Image style={accountStyles.cover} source={(this.state.photo) ? this.state.photo : ((this.props.account.user.profilePic) ? { uri: vars.BASE_URL_PP + 'uploads/' + this.props.account.user.profilePic } : { uri: 'http://43.241.63.15:3003/uploads/1520249460987_thumbnail-3.jpg' })} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._OpenGallery.bind(this)} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#bbb', marginTop: '8%' }}>{"EDIT PHOTO"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Footer />
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.WelcomeReducer.token,
        account: state.AccountReducer,
        category: state.CategoryReducer,
        favorite: state.FavoriteReducer,
        flashmessage: state.FlashMessageReducer,
        loader: state.ActivityIndicatorReducer,
        splash: state.SplashScreenReducer,
        user: state.AuthenticationReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        show,
        hide,
        showMessage,
        getInterests,
        getDetails,
        setDetails,
        setProfilePic,
        checkAccess
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
