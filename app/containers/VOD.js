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
import WelcomeStyle from "../style/welcomeStyle";
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
import Search from '../components/Search/Search';

import MessageBar from '../components/Message/Message';
import GameView from '../components/GameView/GameView';
import CategoryList from '../components/CategoryList/CategoryList';
import Globals from  '../constants/Globals';
import DeviceType from '../../App';
import favoriteStyles from "../style/favoriteStyle";

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

    _openBannerHTML5Game = () =>{
      let game = this.props.games.games.filter(g => { return g.gameId === 34 && g.gameType === 'HTML5'});
      console.log('aa call thai che');
      // console.log(this.props);
      console.log(game);
      NavigationService.navigate('Detail',{game: game[0]});
    }

    discoverClick = () => {
      this.switchFavorite();
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
                                                  <CategoryList key={index} index={index} category={category} viewCategoryGames={this.viewCategoryGames} />
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
                                               <View key = {index} style={{flex: 3}}>

                                                  <View style={WelcomeStyle.gameListBox}>

                                                    <View style={{flexDirection: 'row', width: '50%', height: '100%'}}>
                                                      <View style={WelcomeStyle.transformView}>
                                                        <Icon name={category.categoryIcon.slice(6)} size={ Globals.DeviceType === 'Phone'? 22 : 40 } style={WelcomeStyle.iconStyle} color='#423620' />
                                                        <Text numberOfLines={1} style={WelcomeStyle.headingText}>
                                                            {category.categoryName.toUpperCase()}
                                                        </Text>
                                                      </View>
                                                      <View style={WelcomeStyle.viewAllStyle} />
                                                    </View>
                                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: '50%'}}>
                                                      <View style={WelcomeStyle.viewAllViewStyle}>
                                                        <TouchableOpacity onPress={() => this.viewCategoryGames(category) }>
                                                          <Text style={[styles.avRegular, WelcomeStyle.browseAll]}>
                                                              VIEW ALL
                                                          </Text>
                                                        </TouchableOpacity>
                                                      </View>
                                                    </View>

                                                  </View>


                                                <View style={WelcomeStyle.gameView}>
                                                  <View style={{flexDirection: "row"}}>
                                                    <ScrollView horizontal={true} >
                                                      {
                                                        games.map((game, gameIndex) => {
                                                          return (
                                                              <GameView key={gameIndex} game={game} gameIndex={gameIndex} handleMessageBar={this.handleMessageBar} />
                                                            )
                                                        })
                                                      }
                                                    </ScrollView>
                                                  </View>
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
                <Search from={"html5"}/>

                <View style={VODStyle.contentView}>
                    <MessageBar showMessage={this.state.showMessage} color={this.state.color} message={this.state.message}/>
                    <ScrollView keyboardShouldPersistTaps={'always'} keyboardDismissMode='on-drag' contentContainerStyle={{minHeight: Globals.IphoneX ?  Globals.deviceHeight - 140 : Globals.deviceHeight - 80}}>
                        <View style={{flex: 3}}>
                          <View style={VODStyle.bannerView}>
                            <Banner openBannerHTML5Game={this._openBannerHTML5Game}/>
                          </View>

                          <View>
                            <View style={VODStyle.html5FavoriteView}>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                                  <Image source={require('../assets/images/html5.png')} style={VODStyle.html5iconStyle}/>
                                  <Text> {'  '} </Text>
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
                          <View style={{paddingHorizontal:  Globals.DeviceType === 'Phone'? 15 : 30}}>
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
