import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Dimensions, Image, View, StatusBar, Linking, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, FlatList, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// styles
import { styles } from "../../style/appStyles";
import VODStyle from "../../style/vodStyle";
import WelcomeStyle from "../../style/welcomeStyle";

// Actions
import { searchText } from '../../actions/SearchActions';
import { showMessage } from '../../actions/FlashMessageActions';
import { show, hide } from '../../actions/ActivityIndicatorActions';
import { getGames } from "../../actions/GamesActions";
import { getFavouriteGames, setFavouriteGames } from "../../actions/FavoriteActions";
import { getDetails, getInterests } from '../../actions/AccountActions';
import { getCategories } from "../../actions/CategoryActions";
import { showSearchBar, HideSearchBar, onShowSearchView } from '../../actions/HeaderActions';

// Other data/helper functions
import * as vars from '../../constants/api';
import { messages } from '../../constants/messages';
import { console_log } from '../../utils/helper';
import NavigationService from "../../utils/NavigationService";
import Globals from '../../constants/Globals';
import DeviceType from '../../../App';

// Get Device Height and Width
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      message: '',
      showMessage: false,
      gameType: 'HTML5'
    };

    axios.defaults.headers.common['authorization'] = this.props.accessToken;
  }

  _openHTML5Game(game) {
    if (this.props.handleGame) {
      this.props.handleGame(game);
    }
    else {
      if (this.props.from === 'Search') {
        this.props.onShowSearchView(false);
        this.props.searchText('');
        this.props.showSearchBar(false);
        this.props.parentProps();
      }
      NavigationService.navigate('Detail', { game: game });
    }
  }

  _changeHTML5Game(game) {
    this.props.handleGame(game);
  }

  render() {
    const { game, gameIndex } = this.props;
    return (
      <View style={[WelcomeStyle.imageThmbnailGames]} key={gameIndex}>
        <View style={{ flex: 3 }}>

          <View style={{ height: '70%' }}>
            <View style={WelcomeStyle.gameImageView}>
              <TouchableOpacity onPress={() => this._openHTML5Game(game)} >
                <Image style={WelcomeStyle.imageGame} resizeMode="stretch" source={{ uri: game.gameImage }} ></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={WelcomeStyle.gameNameFavorite}>
            <View style={WelcomeStyle.gameNameFavoriteOuter}>
              <View style={WelcomeStyle.gameNameFavoriteInner}>
                <TouchableOpacity onPress={() => this._openHTML5Game(game)} >
                  <Text style={[styles.avRegular, WelcomeStyle.gameTitleText]} numberOfLines={1}> {game.gameTitle && game.gameTitle.toUpperCase()} </Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '20%' }}>
                <TouchableOpacity onPress={(e) => this.props.handleFavoriteClicked(game, e)} >
                  <Icon
                    ref={game.gameId}
                    name={this.props.isGameFavorite? "star" : "star-o"}
                    size={Globals.DeviceType === 'Phone' ? 24 : 36}
                    style={WelcomeStyle.iconStyle,{zIndex: 1}} color="#f4aa1c" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={WelcomeStyle.gameRatingIcon}>
            <View style={WelcomeStyle.gameRatingIconOuter}>
              <View style={WelcomeStyle.gameRatingIconInner}>

                {
                  [1, 2, 3, 4, 5].map((rate, index) => {
                    return (
                      <Icon key={index} name={game.userRating < rate ? 'star-o' : 'star'} size={Globals.DeviceType === 'Phone' ? 15 : 23} color='#f4aa1c' style={{ paddingHorizontal: 1.5 }} />
                    )
                  })
                }

              </View>
              <View style={WelcomeStyle.html5Icon}>
                <TouchableOpacity onPress={() => this._openHTML5Game(game)} >
                  <Icon name='html5' size={Globals.DeviceType === 'Phone' ? 18 : 26} color='#fff' />
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </View>

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
    user: state.AuthenticationReducer,
    games: state.GamesReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    show,
    hide,
    showMessage,
    getDetails,
    getInterests,
    getGames,
    getFavouriteGames,
    setFavouriteGames,
    getCategories,
    showSearchBar,
    HideSearchBar,
    onShowSearchView,
    searchText
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
