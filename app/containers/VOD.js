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
import Banner from '../components/Banner/Banner';

// Styles
import { styles } from "../style/appStyles";
import VODStyle from "../style/vodStyle";
import welcomeStyle from "../style/welcomeStyle";
// Other data/helper functions
import { showMessage } from '../actions/FlashMessageActions';
import { show, hide } from '../actions/ActivityIndicatorActions';
import { getGames } from "../actions/GamesActions";
import { getFavouriteGames, setFavouriteGames } from "../actions/FavoriteActions";
import { getDetails, getInterests } from '../actions/AccountActions';
import { getCategories } from "../actions/CategoryActions";
import * as vars from '../constants/api';
import { messages } from '../constants/messages';
import { console_log } from '../utils/helper';
import NavigationService from "../utils/NavigationService";
import Loader from '../components/Loader/Loader';
// import Search from '../components/Search/Search';

import MessageBar from '../components/Message/Message';
import GameView from '../components/GameView/GameView';
import Globals from  '../constants/Globals';
import DeviceType from '../../App';

import CategoryList from '../components/CategoryList/CategoryList';


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
            gameType: 'HTML5'
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

            axios.all([axios.get(vars.BASE_API_URL_GL + '/getUserProfile'), axios.get(vars.BASE_API_URL_GL+'/getGames'), axios.get(vars.BASE_API_URL_GL+'/getCategories'), axios.get(vars.BASE_API_URL_GL + '/interests')])
                .then(axios.spread((userProfile, games, categories, interests) => {
                    if (userProfile.data.data) {
                        this.props.getDetails(userProfile.data.data);
                    }

                    // for games
                    if (games.data.data) {
                        this.props.getGames(games.data.data);
                        this.getFavouriteGames(); //1
                    }

                    // for categories);
                    if (categories.data.data) {
                        this.props.getCategories(categories.data.data);
                    }

                    // for interests
                    if (interests.data.data) {
                        this.props.getInterests(interests.data.data);
                    }


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


    switchFavorite() {
        this.setState({ favoriteSwitch: !this.state.favoriteSwitch });
        this.getFavouriteGames();
    }

    _onPressButton(data) {
        console.log("_onPressButton click");
    }

    viewCategoryGames(category)
    {
      NavigationService.navigate('Category',{category: category});
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

    LoadHTMLGames = () =>{
        let categories = this.props.category.categories;
        let getAllGames = this.props.games.games;

        let favoriteGames = this.props.favorite.games.filter(g => { return g.gameType === this.state.gameType });

        let html5CategoryList = categories.filter(c => {return c.categoryTypeName === this.state.gameType} );

        return(
            <View>
                {!this.state.favoriteSwitch  ?
                      <View>
                          {
                            html5CategoryList.length > 0 &&
                            <ScrollView horizontal={true} >
                                <View style={{ flexDirection: 'row' }}>
                                    {
                                        html5CategoryList.map((category, index) => {
                                            return (
                                                  <View style={welcomeStyle.imageThmbnailCategory} key={index}>
                                                    <TouchableOpacity onPress={() => this.viewCategoryGames(category)}>
                                                        <ImageBackground style={welcomeStyle.imageBackgroundCategory} source={{uri: category.categoryImage}}>
                                                        </ImageBackground>
                                                        <Text style={welcomeStyle.categoryNameText}>{category.categoryName}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                           }

                           {
                             html5CategoryList.length > 0 &&
                                 <View>
                                     {
                                         html5CategoryList.map((category, index) => {
                                            let games = (getAllGames.length > 0 && getAllGames.filter((g) => {return g.categoryId == category.categoryId}).length > 0) ? getAllGames.filter((g) => {return g.categoryId == category.categoryId}).slice(0, 10) : []

                                             return (
                                               <View key = {index}>

                                                <View style={welcomeStyle.gameListBox}>
                                                    <View style={welcomeStyle.transformView}>
                                                      <Icon name={category.categoryIcon.slice(6)} size={ Globals.DeviceType === 'Phone'? 22 : 30 } style={welcomeStyle.iconStyle} color='#423620' />

                                                      <Text numberOfLines={1} style={welcomeStyle.headingText}>
                                                          {category.categoryName.toUpperCase()}
                                                      </Text>
                                                    </View>
                                                    <View style={welcomeStyle.viewAllStyle} />
                                                    <View style={welcomeStyle.viewAllViewStyle}>
                                                      <TouchableOpacity onPress={() => this.viewCategoryGames(category) }>
                                                        <Text style={[styles.avRegular, welcomeStyle.browseAll]}>
                                                            VIEW ALL
                                                        </Text>
                                                      </TouchableOpacity>
                                                    </View>
                                                  </View>

                                                <View style={{flexDirection: "row"}}>
                                                  <ScrollView horizontal={true} >
                                                    {
                                                      games.map((game, gameIndex) => {
                                                        return (
                                                            <GameView game={game} gameIndex={gameIndex} handleMessageBar={this.handleMessageBar} />
                                                          )
                                                      })
                                                    }
                                                  </ScrollView>
                                                </View>
                                              </View>

                                             )
                                         })
                                     }
                                 </View>
                            }
                      </View>
                    :
                      <View>
                      {
                        favoriteGames.length > 0 &&
                            <View>
                               <View style={{flexDirection: "row"}}>
                                 <ScrollView horizontal={true} >
                                 {
                                   favoriteGames.map((game, gameIndex) => {
                                     return (
                                        <GameView game={game} gameIndex={gameIndex} handleMessageBar={this.handleMessageBar} />
                                        )
                                    })
                                  }
                                 </ScrollView>
                               </View>
                            </View>
                       }
                      </View>
                  }
            </View>
        )

    }


    render() {
        return (
            <Container>
                <ImageBackground  style={{ zIndex: 999 }}>
                <Header
                    isDrawer={true}
                    isTitle= {false}
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
                            <Banner />
                          </View>

                          <View>
                            <View style={{ flexDirection: 'row', paddingVertical: 20, paddingHorizontal:20, justifyContent: 'space-between', backgroundColor: 'black', alignItems: 'center' }}>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                                  <Image source={require('../assets/images/html5.png')} style={{width: 15, height: 15}}/>
                                  <Text> {' '} </Text>
                                  <Text style={[styles.avRegular, VODStyle.allCategory]}>
                                      HTML5 GAMES
                                  </Text>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={[styles.avRegular, VODStyle.favoriteSwitchText]}>
                                      Favorites
                                  </Text>
                                  <Switch style={{ transform: [{ scaleX: .85 }, { scaleY: .75 }] }} value={this.state.favoriteSwitch} onValueChange={this.switchFavorite} />
                              </View>
                            </View>
                          </View>
                          <View style={{paddingHorizontal: 20}}>
                            { this.state.dataLoad ? this.LoadHTMLGames() : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(VOD);
