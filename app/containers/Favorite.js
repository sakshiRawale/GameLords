import React, { Component } from "react";
import { BackHandler, Platform, Dimensions, View, TouchableHighlight, TextInput, Text, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';
import Orientation from 'react-native-orientation';

// Components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader';
import GameView from '../components/GameView/GameView';
import Search from '../components/Search/Search';

// Images
import * as Images from "../assets/Images";

// Actions
import { show, hide } from '../actions/ActivityIndicatorActions';
import { setFavouriteGames, getFavouriteGames } from '../actions/FavoriteActions';
import { showMessage } from '../actions/FlashMessageActions';

// Styles
import { styles } from "../style/appStyles";
import favoriteStyles from "../style/favoriteStyle";
import NavigationService from "../utils/NavigationService";
import { messages } from '../constants/messages';
import { console_log } from '../utils/helper';
import * as vars from '../constants/api';

// Other data/helper functions
import MessageBar from '../components/Message/Message';
import Globals from "../constants/Globals";

// Get Device Height and Width
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameType: 'HTML5',
      color: '',
      message: '',
      showMessage: false,
    }
  }

  componentWillMount() {
    Orientation.lockToPortrait();
    this.getFavouriteGames();
  }

  getFavouriteGames = () => {
    axios.get(vars.BASE_API_URL_GL + '/getFavorites?uid=' + this.props.account.user.uid)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          this.props.getFavouriteGames(response.data);
        }
      })
      .catch((error) => {
        this.setState({ isValid: false, errorMessage: 'Unable to fetch the data.' });
      });
  }

  componentDidMount() {
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

  handleMessageBar = (success) => {
    if (success) {
      this.setState({ color: 'green', message: messages.addToFavorites, showMessage: !this.state.showMessage })
    }
    else {
      this.setState({ color: 'red', message: messages.removeFromFavorites, showMessage: !this.state.showMessage })
    }
  }

  discoverClick = () => {
    NavigationService.navigate('DrawerVOD');
  }

  _handleFavoriteClicked = (data, current) => {
    this.gameFavorite(data);
  }

  gameFavorite(data) {
    let favoriteGames = this.props.favorite.games;
    let indexOf = favoriteGames.findIndex((f) => {
      return f.gameId == data.gameId;
    });

    let gameData = {
      uid: this.props.account.user.uid,
      gameId: data.gameId,
      isFavorite: !this.isGameFavorite(data.gameId)
    };

    if (indexOf == -1) {
      favoriteGames.push(gameData);
      this.handleMessageBar(true)

    }
    else {
      favoriteGames.splice(indexOf, 1);
      this.handleMessageBar(false)
    }

    axios.post(vars.BASE_API_URL_GL + "/favorite", gameData)
      .then((response) => {
        this.props.showMessage({
          message: messages.addToFavorites,
          type: true
        });
        console.log(response);
      })
      .catch((error) => {
        console_log(error);
      });

  }

  isGameFavorite(gameId) {
    let indexOf = this.props.favorite.games.findIndex((f) => {
      return f.gameId == gameId;
    });
    if (indexOf != -1) {
      return true;
    }
    return false;
  }

  render() {
    let favoriteGames = this.props.favorite.games.filter(g => { return g.gameType === this.state.gameType });

    return (
      <Container>
        <ImageBackground style={{ zIndex: 999 }}>
          <Header
            isDrawer={false}
            isTitle={true}
            title={'Favorites'}
            isSearch={true}
            rightLabel=''
          />
        </ImageBackground>
        <Loader visible={this.props.loader.isLoading} />
        <Search from={"html5"} />
        <View style={favoriteStyles.content}>
          <MessageBar showMessage={this.state.showMessage} color={this.state.color} message={this.state.message} />
          <ScrollView style={{ marginTop: 15 }} contentContainerStyle={{ minHeight: Globals.IphoneX ? Globals.deviceHeight - 140 : Globals.deviceHeight - 100 }}>
            <View style={{ flex: 3 }}>

              <View style={favoriteStyles.gameviewFav}>
                {
                  favoriteGames.map((game, gameIndex) => {
                    return (
                      <View style={favoriteStyles.gameView}>
                        <GameView game={game} gameIndex={gameIndex} handleFavoriteClicked={this._handleFavoriteClicked} isGameFavorite={this.isGameFavorite(game.gameId)} />
                      </View>
                    )
                  })
                }

                {
                  (favoriteGames.length <= 0) &&
                    <View style={favoriteStyles.noGameFound}>
                      <View>
                        <Icon name={'html5'} size={Globals.DeviceType === 'Phone' ? 50 : 80} style={favoriteStyles.html5iconStyle} color='#f2a11b' />
                      </View>
                      <View style={{ paddingVertical: 10 }}>
                        <Text style={[styles.avRegular, favoriteStyles.favoriteTextStyle, { marginTop: 5 }]}>No Favorite Game Yet</Text>
                      </View>

                      <View>
                        <View style={{ justifyContent: 'center' }}>
                          <Text style={[styles.avRegular, favoriteStyles.favoriteTextStyle]}>Add your favorite games to access</Text>
                          <Text style={[styles.avRegular, favoriteStyles.favoriteTextStyle]}>and</Text>
                          <Text style={[styles.avRegular, favoriteStyles.favoriteTextStyle]}>Play easily without any hassels.</Text>
                        </View>
                      </View>

                      <View style={{ paddingVertical: 40 }}>
                        <TouchableOpacity onPress={() => this.discoverClick()} >
                          <View style={favoriteStyles.discoverButton}>
                            <Text style={[styles.avRegular, favoriteStyles.discoverButtonText]} > DISCOVER </Text>
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
