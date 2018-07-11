import React, { Component } from "react";
import { WebView, Dimensions, View, TouchableHighlight, TextInput, Text, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
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
import { background } from "../assets/Images";

// Styles
import { styles } from "../style/appStyles";
import DetailStyles from "../style/detailStyle";
import { show, hide } from '../actions/ActivityIndicatorActions';
import { getLikesGames, getFavouriteGames } from '../actions/FavoriteActions';
import { showMessage } from '../actions/FlashMessageActions';
import NavigationService from "../utils/NavigationService";
import { messages } from '../constants/messages';
import { console_log } from '../utils/helper';
import * as vars from '../constants/api';
import Search from '../components/Search/Search';
// Other data/helper functions
import MessageBar from '../components/Message/Message';
import Globals from "../constants/Globals";
import * as Images from "../assets/Images";


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameType: 'HTML5',
            color: '',
            message:'',
            showMessage:false,
            game: '',
            categoryId: '',
            categoryName: '',
            liked: false,
            openGame: false,
            bgImages: ["", Images.rpg, Images.augmentedReality, Images.virtualReality, Images.action, Images.adventure, Images.arcade, Images.racing, Images.sports, Images.utilities, Images.action, Images.adventure, Images.arcade, Images.racing, Images.sports, Images.rts, "", Images.premium, Images.premium, "", Images.premium, Images.premium]
            // game: this.props.navigation.state.params.game,
            // categoryId: this.props.navigation.state.params.game.categoryId,
            // categoryName: this.props.navigation.state.params.game.categoryName,
        }
    }

    componentWillMount(){
      this.getGameDetail(this.props.navigation.state.params.game.gameId);
      this.getGameLikes(this.props.account.user.uid);this.state.bgImages
    }

    getGameDetail(gameId)
    {

      axios.get(vars.BASE_API_URL_GL+'/getGames?gameId='+gameId)
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                      game: response.data.data[0],
                      categoryId: response.data.data[0].categoryId,
                      categoryName: response.data.data[0].categoryName,
                    });
                }
            })
            .catch((error) => {
                this.props.hide();
                this.setState({ isValid: false, errorMessage: 'Unable to fetch the data.'});
            });
    }

    handleGame= (game) => {
      this.getGameDetail(game.gameId);
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

    getGameLikes(userId){
      axios.get(vars.BASE_API_URL_GL+'/getUserLikes?uid='+userId)
        .then((response) => {
          console.log(response);
            if (response.data.success) {
                this.props.getLikesGames(response.data);
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

    handleLikeMessageBar = (success) => {
      if (success)
      {
        this.setState({color:'green', message: messages.addToLikes, showMessage: !this.state.showMessage})
      }
      else
      {
        this.setState({color:'red', message: messages.removeFromLikes, showMessage: !this.state.showMessage})
      }
    }

    _handleFavoriteClicked=(data,current)=> {
      this.gameFavorite(data);
    }



    _handleRateClicked=(data,current)=> {
      this.gameRate(data);
    }

    gameRate(data){
      let likeGames = this.props.favorite.likeGames;
      let indexOf = likeGames.findIndex((f) => {
          return f.gameId == data.gameId;
      });

      let gameData = {
        uid: this.props.account.user.uid,
        gameId: data.gameId,
        liked: !this.isGameLike(data.gameId)
      };

      if (indexOf == -1) {
        likeGames.push(gameData);
        this.handleLikeMessageBar(true)

      }
      else {
        likeGames.splice(indexOf, 1);
        this.handleLikeMessageBar(false)
      }

      axios.post(vars.BASE_API_URL_GL+'/userLike', gameData)
          .then((response) => {
              if(response.status){
                this.props.showMessage({
                    message: messages.addToLikes,
                    type: true
                });
              }
          })
          .catch((error) => {
              console.log(error);
          });
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

    isGameLike(gameId)
    {
      let indexOf = this.props.favorite.likeGames.findIndex((f) => {
            return f.gameId == gameId;
        });
        if (indexOf != -1) {
            return true;
        }
        return false;
    }

    viewCategoryGames(categoryId)
    {
      let category = this.props.category.categories.filter(c => {return c.categoryId === categoryId} );
      NavigationService.navigate('Category',{category: category[0]});
    }

    loadGame() {
        this.props.show();
        this.setState({
            openGame: !this.state.openGame
        });
            setTimeout(() => {
                this.props.hide();
            }, 2000);
        }

    render() {
        let getAllGames = this.props.games.games;
        let html5RelatedList = getAllGames.filter(g => {return g.gameType === this.state.gameType && g.categoryId === this.state.categoryId && g.gameId !== this.state.game.gameId} );
        const { game, categoryId, categoryName, liked } = this.state;
        console.log(game);
        return (
            <Container>
              <ImageBackground style={{ zIndex: 999 }}>
              <Header
                  isDrawer={false}
                  isTitle={true}
                  title={game.gameTitle}
                  isSearch={true}
                  rightLabel=''
              />
              </ImageBackground>
              <Loader visible={this.props.loader.isLoading} />
                <Search from={"html5"}/>
                <View style={DetailStyles.content}>

                  <MessageBar showMessage={this.state.showMessage} color={this.state.color} message={this.state.message}/>

                  {
                    !this.state.openGame ?
                        <ScrollView bounces={false} contentContainerStyle={{minHeight: Globals.IphoneX ?  Globals.deviceHeight - 140 : Globals.deviceHeight - 100}}>
                        <ImageBackground source={this.state.bgImages[categoryId]} style={{ flex: 1 }}>
                            <View style={DetailStyles.gameDetailView}>

                              <View style={DetailStyles.detailViewStyle}>
                                  <View style={{alignSelf: 'center'}}>
                                    <View style={DetailStyles.gameImage}>
                                      <Image style={DetailStyles.imageGameStyle} resizeMode="stretch" source={{uri: game.gameImage}} />
                                    </View>
                                  </View>

                                  <View style={{alignItems: 'flex-start', paddingHorizontal: 15, paddingVertical: 20}}>
                                    <Text style={DetailStyles.gameTextStyle} > {game.gameTitle && game.gameTitle.toUpperCase()} </Text>
                                    <View style={{paddingHorizontal: 5, paddingVertical: 5}}>
                                      <View style={{flexDirection: 'row'}}>
                                        {
                                          [1,2,3,4,5].map((rate, index) => {
                                            return (
                                              <Icon key={index} name={game.userRating < rate ? 'star-o' : 'star'} size={ Globals.DeviceType === 'Phone'? 27 : 36 } style={DetailStyles.iconRatingStyle} color='#f4aa1c' />
                                            )
                                          })
                                        }
                                      </View>
                                    </View>

                                    <Text style={DetailStyles.gameDetailTextStyle} > {parseFloat(game.userRating).toFixed('1')} average user rating based on {game.totalUserReview} reviews </Text>

                                    <View style={DetailStyles.gameDetailsView}>

                                      <View style={DetailStyles.gameDetailsViewCol}>
                                        <View style={DetailStyles.gameDetailsViewLeft}>
                                          <Text style={DetailStyles.gameDetailTextStyle} > Category </Text>
                                          <Text style={DetailStyles.gameDetailTextStyle} >{':'}</Text>
                                        </View>
                                        <View style={DetailStyles.gameDetailsViewRight}>
                                          <Text style={DetailStyles.gameDetailTextStyle} >{categoryName} </Text>
                                        </View>
                                      </View>

                                      <View style={DetailStyles.gameDetailsViewCol}>
                                        <View style={DetailStyles.gameDetailsViewLeft}>
                                          <Text style={DetailStyles.gameDetailTextStyle} > Platforms </Text>
                                          <Text style={DetailStyles.gameDetailTextStyle} >{':'}</Text>
                                        </View>
                                        <View style={DetailStyles.gameDetailsViewRight}>
                                          <Text style={DetailStyles.gameDetailTextStyle} >{game.platforms} </Text>
                                        </View>
                                      </View>

                                      <View style={DetailStyles.gameDetailsViewCol}>
                                        <View style={DetailStyles.gameDetailsViewLeft}>
                                          <Text style={DetailStyles.gameDetailTextStyle} > Type </Text>
                                          <Text style={DetailStyles.gameDetailTextStyle} >{':'}</Text>
                                        </View>
                                        <View style={DetailStyles.gameDetailsViewRight}>
                                          <Text style={DetailStyles.gameDetailTextStyle} >{game.gameType} </Text>
                                        </View>
                                      </View>

                                      <View style={DetailStyles.gameDetailsViewCol}>
                                        <View style={DetailStyles.gameDetailsViewLeft}>
                                          <Text style={DetailStyles.gameDetailTextStyle} > Description </Text>
                                          <Text style={DetailStyles.gameDetailTextStyle} >{':'}</Text>
                                        </View>
                                        <View style={[DetailStyles.gameDetailsViewRight]}>
                                          <Text style={DetailStyles.gameDetailTextStyle} >{game.gameDesc} </Text>
                                        </View>
                                      </View>

                                      <View style={DetailStyles.gameDetailsViewCol}>
                                        <View style={DetailStyles.gameDetailsViewLeft}>
                                          <Text style={DetailStyles.gameDetailTextStyle} >  </Text>
                                          <Text style={DetailStyles.gameDetailTextStyle} ></Text>
                                        </View>
                                        <View style={DetailStyles.gameDetailsViewRight}>
                                          <View style={DetailStyles.gameDetailsViewFavRate}>

                                          <View style={{width: '50%', alignItems: 'flex-start', paddingHorizontal: 10}}>
                                            <TouchableOpacity onPress={(e)=> this._handleFavoriteClicked(game,e)} >
                                              <Icon
                                              name={this.isGameFavorite(game.gameId) ? "star" : "star-o"}
                                              size={ Globals.DeviceType === 'Phone'? 33 : 45 }
                                              style={[DetailStyles.iconStyle, DetailStyles.gameFavRateIcon]} color="#f4aa1c" />
                                            </TouchableOpacity>
                                          </View>

                                          <View style={{width: '50%', alignSelf: 'flex-end', paddingHorizontal: 10}}>
                                            <TouchableOpacity onPress={(e)=> this._handleRateClicked(game,e)} >
                                              <Icon
                                              name={this.isGameLike(game.gameId) ? "thumbs-up" : "thumbs-o-up"}
                                              size={ Globals.DeviceType === 'Phone'? 33 : 45 }
                                              style={[DetailStyles.iconStyle,DetailStyles.gameFavRateIcon]} color="#f4aa1c" />
                                            </TouchableOpacity>
                                          </View>

                                          </View>

                                          <View style={DetailStyles.gameDetailsViewFavRate}>
                                            <View style={{width: '50%', alignItems: 'flex-start'}}>
                                              <Text style={[DetailStyles.gameDetailTextStyle]} > Favorite </Text>
                                            </View>
                                            <View style={{width: '50%', alignItems: 'flex-start', paddingHorizontal: 7}}>
                                              <Text style={[DetailStyles.gameDetailTextStyle]} > Rate </Text>
                                            </View>
                                          </View>
                                        </View>
                                      </View>

                                      <View style={DetailStyles.gameDetailsViewCol}>
                                        <View style={DetailStyles.gameDetailsViewLeft}>

                                        </View>
                                      </View>
                                      <View style={[DetailStyles.gameDetailsViewPlayGameRight]}>
                                        <TouchableOpacity onPress={() => this.loadGame(game)} >
                                          <View style={DetailStyles.gamePlayGameView}>
                                              <Text style={DetailStyles.gameDetailPlayGameTextStyle} > PLAY NOW </Text>
                                          </View>
                                        </TouchableOpacity>
                                      </View>

                                    </View>

                                  </View>
                              </View>


                              <View style={{backgroundColor: '#000000', paddingVertical: 20, paddingHorizontal: Globals.DeviceType === 'Phone'? 15 : 30}}>

                                  <View style={DetailStyles.gameListBox}>
                                    <View style={{flexDirection: 'row', width: '50%', height: '100%'}}>
                                      <View style={DetailStyles.transformView}>
                                        <Text numberOfLines={1} style={DetailStyles.headingText}>
                                            {'RELATED GAMES'}
                                        </Text>
                                      </View>
                                      <View style={DetailStyles.viewAllStyle} />
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: '50%'}}>
                                      <View style={DetailStyles.viewAllViewStyle}>
                                        <TouchableOpacity onPress={() => this.viewCategoryGames(categoryId) }>
                                          <Text style={[styles.avRegular, DetailStyles.browseAll]}>
                                              VIEW ALL
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </View>

                                  <View style={DetailStyles.relatedStyle}>
                                    <ScrollView horizontal={true} >
                                      {
                                        html5RelatedList.map((game, gameIndex) => {
                                        return (
                                              <GameView key={gameIndex} game={game} gameIndex={gameIndex} handleMessageBar={this.handleMessageBar} handleGame={this.handleGame} />
                                            )
                                        })
                                      }
                                    </ScrollView>
                                  </View>
                                </View>
                              </View>
                              </ImageBackground>

                            <Footer />
                        </ScrollView>
                    :
                      <View style={{height: Globals.deviceHeight, width: Globals.deviceWidth, backgroundColor: 'black' }}>
                        <WebView
                            source={{ html: "<object width='100%' height='100%' data=" + game.gameFile + "></object>" }}
                            style={{width: Dimensions.get("window").width, height: Dimensions.get("window").height, backgroundColor: 'transparent' }}
                        />
                      </View>
                    }

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
        user: state.AuthenticationReducer,
        games: state.GamesReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        show,
        hide,
        getFavouriteGames,
        getLikesGames,
        showMessage,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
