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
import welcomeStyle from "../../style/welcomeStyle";

// Other data/helper functions
import { showMessage } from '../../actions/FlashMessageActions';
import { show, hide } from '../../actions/ActivityIndicatorActions';
import { getGames } from "../../actions/GamesActions";
import { getFavouriteGames, setFavouriteGames } from "../../actions/FavoriteActions";
import { getDetails, getInterests } from '../../actions/AccountActions';
import { getCategories } from "../../actions/CategoryActions";
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
            color: '',
            message:'',
            showMessage:false,
            gameType: 'HTML5'
        };

        axios.defaults.headers.common['authorization'] = this.props.accessToken;
    }

    _openHTML5Game(game) {
        console.log("_openHTML5Game click");
        NavigationService.navigate('Detail',{game: game});
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
            <View style={welcomeStyle.imageThmbnailGames} key={gameIndex}>
              <View style={{flex: 3}}>

                  <View style={welcomeStyle.gameImageView}>
                    <TouchableOpacity onPress={() => this._openHTML5Game(game) } >
                        <Image style={welcomeStyle.imageGame} resizeMode="stretch" source={{uri: game.gameImage }} ></Image>
                    </TouchableOpacity>
                  </View>

                  <View style={welcomeStyle.gameNameFavorite}>
                    <View style={{width:"100%",flexDirection:"row"}}>
                      <TouchableOpacity onPress={() => this._openHTML5Game(game) } >
                        <Text style={welcomeStyle.gameTitleText} numberOfLines={1}> {game.gameTitle} </Text>
                      </TouchableOpacity>

                      <View style={{alignSelf:"flex-end"}}>
                        <TouchableOpacity onPress={(e)=> this._handleFavoriteClicked(game,e)} >
                          <Icon
                          ref={game.gameId}
                          name={this.isGameFavorite(game.gameId) ? "star" : "star-o"}
                          size={ Globals.DeviceType === 'Phone'? 22 : 30 }
                          style={welcomeStyle.iconStyle,{zIndex:1}} color="#f4aa1c" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={welcomeStyle.gameRatingIcon}>
                    <View style={{flexDirection: 'row'}}>
                      {
                        [1,2,3,4,5].map((rate, index) => {
                          return (
                            <Icon key={index} name={game.userRating < rate ? 'star-o' : 'star'} size={ Globals.DeviceType === 'Phone'? 18 : 28 } style={welcomeStyle.iconRatingStyle} color='#f4aa1c' />
                          )
                        })
                      }
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => this._openHTML5Game(game) } >
                        <Icon name='html5' size={ Globals.DeviceType === 'Phone'? 22 : 30 } style={welcomeStyle.iconStyle} color='#fff' />
                      </TouchableOpacity>
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
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
