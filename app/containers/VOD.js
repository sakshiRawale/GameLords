import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Image, View, StatusBar, Linking, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, FlatList, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
// import Slider from '../components/Slider/Slider';

// Styles
import { styles } from "../style/appStyles";
import VODStyle from "../style/vodStyle";
import liveChannelStyle from "../style/liveChannelStyle";
// Other data/helper functions
import { movie_1, movie_2, tv_1, tv_2, thumbnail } from "../assets/Images";
import { showMessage } from '../actions/FlashMessageActions';
import { show, hide } from '../actions/ActivityIndicatorActions';
import { getDetails, getInterests } from '../actions/AccountActions';
import * as vars from '../constants/api';
import { messages } from '../constants/messages';
import { console_log } from '../utils/helper';
import NavigationService from "../utils/NavigationService";
import Loader from '../components/Loader/Loader';
// import Search from '../components/Search/Search';

import MessageBar from '../components/Message/Message';
import Globals from  '../constants/Globals';
import DeviceType from '../../App';

class VOD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            favoriteSwitch: false,
            dataLoad: false,
            color: '',
            message:'',
            showMessage:false,
        };

        this.switchFavorite = this.switchFavorite.bind(this);
        axios.defaults.headers.common['authorization'] = this.props.accessToken;
    }

    componentWillMount(){
        axios.defaults.headers.common['authorization'] = this.props.accessToken;
        // if(Globals.url ===  'http://uk.mobiotv.com' && this.props.category.categories.length === 0) {
        if(this.props.category.categories.length === 0) {
            this.props.show();
            // axios.all([axios.get(vars.BASE_API_URL_GL + '/getUserProfile'), axios.get(vars.BASE_API_URL_GL + '/interests'), axios.get(vars.BASE_API_URL_GL + '/categories'), axios.get(vars.BASE_API_URL_GL + '/packages'), axios.get(vars.BASE_API_URL_GL + '/favorites'), axios.get(vars.BASE_API_URL_GL + '/likes')])
            axios.all([axios.get(vars.BASE_API_URL_GL + '/getUserProfile')])
                .then(axios.spread((userProfile) => {
                  console.log("is ma ave che");
                  console.log(userProfile.data.data);
                    if (userProfile.data.data) {
                        this.props.getDetails(userProfile.data.data);
                    }

                    // for interests
                    // if (interests.data.data) {
                    //     this.props.getInterests(interests.data.data);
                    // }

                    // for channel categories
                    // if (categories.data.data) {
                    //     this.props.getTVCategories(categories.data.data);
                    // }

                    // for packages of Video On Demand
                    // if (packages.data.data.packages) {
                    //     this.props.getVideosPackages(packages.data.data.packages);
                    //
                    //     // for Videos On Demand
                    //     axios.all(packages.data.data.packages.map(l => axios.get(vars.BASE_API_URL_GL + '/packages/' + l.id)))
                    //         .then(axios.spread((...res) => {
                    //             // all requests are now complete
                    //             res.map((packageDetails) => {
                    //                 if (packageDetails) {
                    //                     this.props.getVideos(packageDetails.data.data.package);
                    //                 }
                    //             });
                    //         }));
                    // }

                    // for favorites
                    // if (favorites.data.data) {
                    //     this.props.addFavoriteChannel(favorites.data.data.channels);
                    //     this.props.addFavoriteVideo(favorites.data.data.videos);
                    // }

                    // for likes
                    // if (likes.data.data) {
                    //     this.props.addLikesChannels(likes.data.data.channels);
                    //     this.props.addLikesVideos(likes.data.data.videos);
                    // }

                    //this.props.hide();
                    this.setState({dataLoad: true})
                }));
        }
    }


    componentDidMount(){
        this.setState({dataLoad: true})
        this.props.show();
        setTimeout(() => {
            this.props.hide();
        }, 1500);
    }

    componentWillReceiveProps(newProps){

    }


    switchFavorite() {
        this.setState({ favoriteSwitch: !this.state.favoriteSwitch });
    }

    render() {
        return (
            <Container>
                <ImageBackground  style={{ zIndex: 999 }}>
                <Header
                    isDrawer={true}
                    isTitle= {Globals.url !==  'http://uk.mobiotv.com' ? true : false}
                    title='VOD'
                    isSearch={true}
                    rightLabel=''
                />
                </ImageBackground>
                <Loader visible={this.props.loader.isLoading}/>
                {/* <Search from={"videos"}/> */}
                <View style={VODStyle.contentView}>
                    <MessageBar showMessage={this.state.showMessage} color={this.state.color} message={this.state.message}/>
                    <ScrollView keyboardShouldPersistTaps={'always'} keyboardDismissMode='on-drag' contentContainerStyle={{minHeight: Globals.IphoneX ?  Globals.deviceHeight - 140 : Globals.deviceHeight - 80}}>
                        <View style={{flex: 3}}>
                        <View style={VODStyle.sliderView}>

                        </View>

                        <View>
                          <Text style={{color:'white'}}> Sagar </Text>
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
        user: state.AuthenticationReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        show,
        hide,
        showMessage,
        getDetails,
        getInterests,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VOD);
