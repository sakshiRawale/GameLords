import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Image, View, StatusBar, Linking, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, FlatList, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Components
import { styles } from "../../style/appStyles";
import VODStyle from "../../style/vodStyle";
import WelcomeStyle from "../../style/welcomeStyle";

// Other data/helper functions
import { showMessage } from '../../actions/FlashMessageActions';
import { show, hide } from '../../actions/ActivityIndicatorActions';
import { getGames } from "../../actions/GamesActions";
import { getFavouriteGames, setFavouriteGames } from "../../actions/FavoriteActions";
import { getDetails, getInterests } from '../../actions/AccountActions';
import { getCategories } from "../../actions/CategoryActions";
import { showSearchBar, HideSearchBar, onShowSearchView } from '../../actions/HeaderActions';
import { searchText } from '../../actions/SearchActions';
import * as vars from '../../constants/api';
import { messages } from '../../constants/messages';
import { console_log } from '../../utils/helper';
import NavigationService from "../../utils/NavigationService";

import Globals from  '../../constants/Globals';
import DeviceType from '../../../App';

class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            message:'',
            showMessage:false,
            gameType: 'HTML5'
        };

        axios.defaults.headers.common['authorization'] = this.props.accessToken;
    }

    _openHTML5Game(game) {
        // this.props.handleGame(game);
        if (this.props.handleGame)
        {
          this.props.handleGame(game);
        }
        else{
            // NavigationService.goBack();
            if(this.props.from === 'Search'){
                this.props.onShowSearchView(false);
                this.props.searchText('');
                this.props.showSearchBar(false);
            }
            NavigationService.navigate('Detail',{game: game});
        }
    }

    _changeHTML5Game(game) {
        this.props.handleGame(game);
        // NavigationService.navigate('Detail',{game: game});
    }

    _handleFavoriteClicked=(data,current)=> {
      // this.refs[data.gameId].setNativeProps({name: "star"});
      /****Comments *****/
      // below code is working
      // this.refs[data.gameId].setNativeProps({style: {color:"#c1c1c1"}});
      // debugger;
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
          this.props.handleMessageBar(true)

        }
        else {
          favoriteGames.splice(indexOf, 1);
          this.props.handleMessageBar(false)
        }

        axios.post(vars.BASE_API_URL_GL+"/favorite", gameData)
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

    isGameFavorite(gameId)
    {
      let indexOf = this.props.favorite.games.findIndex((f) => {
            return f.gameId == gameId;
        });
        if (indexOf != -1) {
            return true;
        }
        return false;
    }

    render() {
        const {game, gameIndex} = this.props;
        return (
            <View style={WelcomeStyle.imageThmbnailGames} key={gameIndex}>
              <View style={{flex: 2}}>

                  <View style={WelcomeStyle.gameImageView}>
                    <TouchableOpacity onPress={() => this._openHTML5Game(game) } >
                        <Image style={WelcomeStyle.imageGame} resizeMode="stretch" source={{uri: game.gameImage }} ></Image>
                    </TouchableOpacity>
                  </View>

                  <View style={WelcomeStyle.gameNameFavorite}>
                    <View style={{width:"100%",flexDirection:"row"}}>
                      <View style={{width: '78%', paddingLeft: 5}}>
                        <TouchableOpacity onPress={() => this._openHTML5Game(game) } >
                          <Text style={WelcomeStyle.gameTitleText} numberOfLines={1}> {game.gameTitle} </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{width:'22%'}}>
                        <TouchableOpacity onPress={(e)=> this._handleFavoriteClicked(game,e)} >
                          <Icon
                          ref={game.gameId}
                          name={this.isGameFavorite(game.gameId) ? "star" : "star-o"}
                          size={ Globals.DeviceType === 'Phone'? 24 : 30 }
                          style={[WelcomeStyle.iconStyle,{zIndex:1}]} color="#f4aa1c" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={WelcomeStyle.gameRatingIcon}>
                    <View style={{width:"100%",flexDirection:"row"}}>
                      <View style={{width: '80%', paddingLeft: 5, flexDirection: 'row'}}>
                        {
                          [1,2,3,4,5].map((rate, index) => {
                            return (
                              <Icon key={index} name={game.userRating < rate ? 'star-o' : 'star'} size={ Globals.DeviceType === 'Phone'? 15 : 28 } color='#f4aa1c' />
                            )
                          })
                        }
                      </View>
                      <View style={{width:'20%',alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this._openHTML5Game(game) } >
                          <Icon name='html5' size={ Globals.DeviceType === 'Phone'? 16 : 30 } color='#fff' />
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