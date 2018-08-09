import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchStyles from "../../style/searchStyle";
import { BackHandler, Keyboard, Dimensions, Platform, Modal, Image, View, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, TouchableOpacity } from "react-native";
import { Container, Content, Header, Item, Button, Input } from "native-base";
import * as vars from '../../constants/api';
import axios from 'axios';
import { showSearchBar, HideSearchBar, onShowSearchView } from '../../actions/HeaderActions';
import { searchText } from '../../actions/SearchActions';
import { console_log } from '../../utils/helper';
import { styles } from "../../style/appStyles";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import NavigationService from '../../utils/NavigationService';
import Footer from '../Footer/Footer';
import GameView from '../GameView/GameView';
import Globals from '../../constants/Globals';
import { messages } from '../../constants/messages';
import MessageBar from '../../components/Message/Message';
import Orientation from 'react-native-orientation';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.from,
      showSearchBar: false,
      searchText: '',
      message: '',
      showMessage: false,
    };
  }

  componentWillUnmount() {
    this.props.searchText('');
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.showSearchBar(false);
    this.props.searchText('');
    this.props.onShowSearchView(false);
    return true;
  }

  onChange(text) {
    this.props.searchText(text);
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

  handleMessageBar = (success) => {
    if (success) {
      this.setState({ color: 'green', message: messages.addToFavorites, showMessage: !this.state.showMessage })
    }
    else {
      this.setState({ color: 'red', message: messages.removeFromFavorites, showMessage: !this.state.showMessage })
    }
  }

  render() {
    var regEx = new RegExp(this.props.search.searchText, 'i');
    let html5Search = [];

    if (this.props.games) {
      html5Search = this.props.games.games.filter((g) => {
        if (regEx.test(g.gameTitle)) {
          return g
        }
      });
    }

    return (
      this.props.header.searchView === true &&
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          top: Platform.OS == "ios" ? ((deviceHeight == 812) ? 80 : 65) : 45,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          width: deviceWidth,
          alignItems: "center",
          position: "absolute",
          justifyContent: "center",
          backgroundColor: "#000"
        }}>
        <ScrollView style={[SearchStyles.content, { width: deviceWidth }]} keyboardShouldPersistTaps={'always'} keyboardDismissMode='on-drag' contentContainerStyle={{ minHeight: Globals.IphoneX ? Globals.deviceHeight - 140 : Globals.deviceHeight - 80 }}>
          <MessageBar showMessage={this.state.showMessage} color={this.state.color} message={this.state.message} />

          <View style={{ flex: 3 }}>
            {this.props.search.searchText !== '' &&
              <View>

                <View style={{ paddingHorizontal: Globals.DeviceType === 'Phone' ? 20 : 30, marginTop: Globals.DeviceType === 'Phone' ? 40 : 80 }}>
                  <View style={SearchStyles.gameListBox}>
                    <View style={SearchStyles.gameListBoxHeading}>

                      <View style={SearchStyles.transformView}>
                        <Icon name={'rocket'} size={Globals.DeviceType === 'Phone' ? 22 : 40} style={SearchStyles.iconStyle} color='#423620' />

                        <Text numberOfLines={1} style={SearchStyles.headingText} >
                          {'GAME DIRECTORIES'}
                        </Text>
                      </View>
                      <View style={SearchStyles.viewAllStyle} />
                    </View>
                  </View>
                </View>

                {
                  ((this.state.type == '' || this.state.type == "html5") && (html5Search.length > 0)) &&
                    <View style={SearchStyles.gameViewOuter}>
                      <View style={SearchStyles.gameViewInner}>
                        {
                          html5Search.map((game, gameIndex) => {
                            return (
                              <View style={SearchStyles.gameView}>
                                <GameView key={gameIndex} game={game} gameIndex={gameIndex} from={'Search'} parentProps={this.props.hideHeader} handleFavoriteClicked={this._handleFavoriteClicked} isGameFavorite={this.isGameFavorite(game.gameId)} />
                              </View>
                            )
                          })
                        }
                      </View>
                    </View>
                  }
                  {
                    (html5Search.length <= 0) &&
                      <View style={SearchStyles.noGameFound}>
                        <Text style={[styles.avRegular, SearchStyles.noSearchText]}>No Game Found</Text>
                      </View>
                  }
              </View>
            }

          </View>
          <Footer />
        </ScrollView>
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.CategoryReducer,
    account: state.AccountReducer,
    games: state.GamesReducer,
    favorite: state.FavoriteReducer,
    header: state.HeaderReducer,
    search: state.SearchReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchText,
    showSearchBar,
    HideSearchBar,
    onShowSearchView
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
