import React, { Component } from "react";
import {Platform, Dimensions,View, TouchableHighlight, TextInput, Text, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';
// Components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader';
import GameView from '../components/GameView/GameView';

// Styles
import { styles } from "../style/appStyles";
import favoriteStyles from "../style/favoriteStyle";
import { show, hide } from '../actions/ActivityIndicatorActions';
import { setFavouriteGames, getFavouriteGames } from '../actions/FavoriteActions';
import { showMessage } from '../actions/FlashMessageActions';
import NavigationService from "../utils/NavigationService";
import { messages } from '../constants/messages';
import { console_log } from '../utils/helper';
import * as vars from '../constants/api';
import Search from '../components/Search/Search';
// Other data/helper functions
import MessageBar from '../components/Message/Message';
import Globals from "../constants/Globals";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameType: 'HTML5',
            color: '',
            message:'',
            showMessage:false,
        }
    }

    componentWillMount(){
      this.getFavouriteGames();
    }

    getFavouriteGames =()=>
    {
      axios.get(vars.BASE_API_URL_GL+'/getFavorites?uid='+this.props.account.user.uid)
        .then((response) => {
          console.log(response);
            if (response.data.success) {
                this.props.getFavouriteGames(response.data);
            }
        })
        .catch((error) => {
            this.setState({ isValid: false, errorMessage: 'Unable to fetch the data.'});
        });
    }

    componentDidMount() {
        this.props.show();
        setTimeout(() => {
            this.props.hide();
        }, 1500);
    }


    handleMessageBar = (success) => {
      if (success)
      {
        this.setState({color:'green', message: messages.addToFavorites, showMessage: !this.state.showMessage})
      }
      else
      {
        this.setState({color:'red', message: messages.removeFromFavorites, showMessage: !this.state.showMessage})
      }
    }

    discoverClick = () => {
      NavigationService.navigate('DrawerVOD');
    }


    render() {
        let favoriteGames = this.props.favorite.games.filter(g => { return g.gameType === this.state.gameType });
        console.log(favoriteGames);

        return (
            <Container>
              <ImageBackground  style={{ zIndex: 999 }}>
              <Header
                  isDrawer={false}
                  isTitle={true}
                  title={'Favorites'}
                  isSearch={true}
                  rightLabel=''
              />
              </ImageBackground>
              <Loader visible={this.props.loader.isLoading} />
                <Search from={"html5"}/>
                <View style={favoriteStyles.content}>
                  <MessageBar showMessage={this.state.showMessage} color={this.state.color} message={this.state.message}/>
                  <ScrollView style={{marginTop: 15}} contentContainerStyle={{minHeight: Globals.IphoneX ?  Globals.deviceHeight - 140 : Globals.deviceHeight - 100}}>
                    <View style={{ flex: 3, backgroundColor: 'black' }}>

                      <View style={{backgroundColor: 'black', flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Globals.DeviceType === 'Phone'? (Platform.OS == "ios" ? ((deviceHeight === 812) ?  deviceWidth / 14 :  deviceWidth / 15) :  deviceWidth / 15) : deviceWidth / 15 }}>
                        {favoriteGames.map((game, gameIndex) => {
                          return (
                                <GameView game={game} gameIndex={gameIndex} handleMessageBar={this.handleMessageBar} />
                              )
                          })
                        }
                        {(favoriteGames.length <= 0 ) &&
                            <View style = {{alignItems : 'center', flex: 4,paddingTop: 30}}>
                              <View>
                                <Image source={require('../assets/images/html5.png')} style={favoriteStyles.html5iconStyle}/>
                              </View>
                              <View style={{paddingVertical: 30}}>
                                <Text style={[styles.avRegular, favoriteStyles.favoriteTextStyle,{color: '#fff', marginTop: 20, alignSelf: 'center'}]}>No Favorite Game Yet</Text>
                              </View>

                              <View>
                                <View style={{justifyContent: 'center'}}>
                                  <Text style={[styles.avRegular, favoriteStyles.favoriteTextStyle, {color: '#fff',alignSelf: 'center'}]}>Add your favorite games to access</Text>
                                  <Text style={[styles.avRegular, favoriteStyles.favoriteTextStyle, {color: '#fff',alignSelf: 'center'}]}>and</Text>
                                  <Text style={[styles.avRegular, favoriteStyles.favoriteTextStyle, {color: '#fff',alignSelf: 'center'}]}>Play easily without any hassels.</Text>
                                </View>
                              </View>


                              <View style={{paddingVertical: 40}}>
                                <TouchableOpacity onPress={() => this.discoverClick()} >
                                  <View style={favoriteStyles.discoverButton}>
                                      <Text style={favoriteStyles.discoverButtonText} > DISCOVER </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>

                        }
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
        getFavouriteGames,
        setFavouriteGames,
        showMessage,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
