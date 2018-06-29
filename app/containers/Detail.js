import React, { Component } from "react";
import { Dimensions,View, TouchableHighlight, TextInput, Text, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
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
import DetailStyles from "../style/detailStyle";
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

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameType: 'HTML5',
            color: '',
            message:'',
            showMessage:false,
            game: this.props.navigation.state.params.game,
            categoryId: this.props.navigation.state.params.game.categoryId,
        }
    }

    componentWillMount(){
      // this.getFavouriteGames();
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



    render() {
        let getAllGames = this.props.games.games;
        let html5RelatedList = getAllGames.filter(g => {return g.gameType === this.state.gameType && g.categoryId === this.state.categoryId && g.gameId !== this.state.game.gameId} );
        console.log(html5RelatedList);
        const { game, categoryId } = this.state;
        console.log(game);
        console.log(categoryId);
        return (
            <Container>
              <ImageBackground  style={{ zIndex: 999 }}>
              <Header
                  isDrawer={false}
                  isTitle={false}
                  title={'Category'}
                  isSearch={true}
                  rightLabel=''
              />
              </ImageBackground>
              <Loader visible={this.props.loader.isLoading} />
                <Search from={"html5"}/>
                <View style={DetailStyles.content}>
                  <MessageBar showMessage={this.state.showMessage} color={this.state.color} message={this.state.message}/>
                  <ScrollView style={{marginTop: 15}} contentContainerStyle={{minHeight: Globals.IphoneX ?  Globals.deviceHeight - 140 : Globals.deviceHeight - 100}}>
                    <View style={{ flex: 3, width: '100%', backgroundColor: 'black' }}>

                      <View style={DetailStyles.detailViewStyle}>
                          <View style={{ alignItems: 'center' }}>
                            <Image style={DetailStyles.imageGameStyle} source={{uri: game.gameImage}} />
                          </View>
                          <View style={{alignItems: 'flex-start', paddingHorizontal: 15, paddingVertical: 10}}>
                            <Text style={DetailStyles.gameTextStyle} > {game.gameTitle.toUpperCase()} </Text>
                            <View style={{flexDirection: 'row'}}>
                              {
                                [1,2,3,4,5].map((rate, index) => {
                                  return (
                                    <Icon key={index} name={game.userRating < rate ? 'star-o' : 'star'} size={ Globals.DeviceType === 'Phone'? 18 : 28 } style={DetailStyles.iconRatingStyle} color='#f4aa1c' />
                                  )
                                })
                              }
                            </View>
                            <Text style={DetailStyles.gameDetailTextStyle} > {parseFloat(game.userRating).toFixed('1')} average user rating based on {game.totalUserReview} reviews </Text>
                          </View>
                      </View>


                      <View style={DetailStyles.gameListBox}>
                         <View style={DetailStyles.transformView}>
                           <Text numberOfLines={1} style={DetailStyles.headingText}>
                               RELATED GAMES
                           </Text>
                         </View>
                         <View style={DetailStyles.viewAllStyle} />
                      </View>


                      <View style={DetailStyles.relatedStyle}>
                        <ScrollView horizontal={true} >
                          {
                            html5RelatedList.map((game, gameIndex) => {
                            return (
                                  <GameView game={game} gameIndex={gameIndex} handleMessageBar={this.handleMessageBar} />
                                )
                            })
                          }
                        </ScrollView>
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
        user: state.AuthenticationReducer,
        games: state.GamesReducer,
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
