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
import liveChannelStyle from "../style/liveChannelStyle";
// Other data/helper functions
import { movie_1, movie_2, tv_1, tv_2, thumbnail } from "../assets/Images";
import { showMessage } from '../actions/FlashMessageActions';
import { show, hide } from '../actions/ActivityIndicatorActions';
import {getFavouriteGames, getGames, setFavouriteGames} from "../actions/GamesActions";
import { getDetails, getInterests } from '../actions/AccountActions';
import { getCategories } from "../actions/CategoryActions";
import * as vars from '../constants/api';
import { messages } from '../constants/messages';
import { console_log } from '../utils/helper';
import NavigationService from "../utils/NavigationService";
import Loader from '../components/Loader/Loader';
// import Search from '../components/Search/Search';

import MessageBar from '../components/Message/Message';
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
            axios.all([axios.get(vars.BASE_API_URL_GL + '/getUserProfile'), axios.get(vars.BASE_API_URL_GL+'/getGames'), axios.get(vars.BASE_API_URL_GL+'/getCategories')])
                .then(axios.spread((userProfile, games, categories) => {
                    if (userProfile.data.data) {
                        this.props.getDetails(userProfile.data.data);
                    }

                    // for games
                    if (games.data.data) {
                        this.props.getGames(games.data.data);
                    }

                    // for interests
                    // if (interests.data.data) {
                    //     this.props.getInterests(interests.data.data);
                    // }

                    // for categories);
                    if (categories.data.data) {
                        this.props.getCategories(categories.data.data);
                    }

                    // for packages of Video On Demand
                    // if (packages.data.data.packages) {
                    //     this.props.getVideosPackages(packages.data.data.packages);
                    //
                    //     // for Videos On Demand
                    //     axios.all(packages.data.data.packages.map(l => axios.get(vars.BASE_API_URL_GL + '/packages/' + l.id)))
                    //         .then(axios.spread((...res) => {
                    //             // all requests are now complete
                    //             res.map((packageDetails) => {
                    //                 if (packageDetails) {
                    //                     this.props.getVideos(packageDetails.data.data.package);
                    //                 }
                    //             });
                    //         }));
                    // }

                    // for favorites
                    // if (favorites.data.data) {
                    //     this.props.addFavoriteChannel(favorites.data.data.channels);
                    //     this.props.addFavoriteVideo(favorites.data.data.videos);
                    // }

                    // for likes
                    // if (likes.data.data) {
                    //     this.props.addLikesChannels(likes.data.data.channels);
                    //     this.props.addLikesVideos(likes.data.data.videos);
                    // }

                    //this.props.hide();
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

    componentWillReceiveProps(newProps){

    }


    switchFavorite() {
        this.setState({ favoriteSwitch: !this.state.favoriteSwitch });
    }

    _onPressButton(data) {
        console.log("_onPressButton click");
        // NavigationService.navigate('PlayVOD');
        // this.props.getVideoOrChannelRelatedData(data);
    }

    _handleFavoriteClicked(data) {
      console.log("_handleFavoriteClicked click");
      // this.videoFavorite(data.video);
    }

    isCategoryFavorite(categoryId) {
      console.log("isCategoryFavorite click");
      // let indexOf = this.props.favorite.videos.findIndex((f) => {
      //     return f.videoId == videoId;
      // });
      // if (indexOf != -1) {
      //     return true;
      // }
      // return false;
    }

    _onPressGameButton(data) {
        console.log("_onPressGameButton click");
        // NavigationService.navigate('PlayVOD');
        // this.props.getVideoOrChannelRelatedData(data);
    }

    _handleFavoriteGameClicked(data) {
      console.log("_handleFavoriteGameClicked click");
      // this.videoFavorite(data.video);
    }

    isCategoryGameFavorite(categoryId) {
      console.log("isCategoryGameFavorite click");
      // let indexOf = this.props.favorite.videos.findIndex((f) => {
      //     return f.videoId == videoId;
      // });
      // if (indexOf != -1) {
      //     return true;
      // }
      // return false;
    }

    LoadHTMLGames = () =>{
        // let favoriteVideosIds = this.props.favorite.videos.map((v) => v.videoId);
        // let bidiotvfavourite = [].concat.apply([], bidiotvMovies.map((c) => c.videos)).filter((v) => {
        //     if (~favoriteVideosIds.indexOf(v.id)) {
        //         return v;
        //     }
        // });
        //
        let categories = this.props.category.categories;
        let getAllGames = this.props.games.games;

        let html5CategoryList = categories.filter(c => {return c.categoryTypeName === this.state.gameType} );

        console.log("==============");
        console.log(html5CategoryList);
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
                                                  <View style={liveChannelStyle.imageThmbnailCategory} key={index}>
                                                    <TouchableOpacity onPress={this._onPressButton.bind(this, {cat: category})}>
                                                        <ImageBackground style={liveChannelStyle.imageBackgroundCategory} source={{uri: category.categoryImage}}>
                                                        </ImageBackground>
                                                        <Text style={liveChannelStyle.categoryNameText}>{category.categoryName}</Text>
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

                                            console.log('==================');
                                            console.log(games);

                                             return (
                                               <View key = {index}>

                                                <View

                                                style={{ height: 35,flexDirection: 'row',  justifyContent: 'space-between', backgroundColor: 'black', alignItems: 'center', color:"white",borderBottomColor:"#f4aa1c",borderBottomWidth:1}}>

                                                    <View style={liveChannelStyle.transformView}>
                                                        <Icon name={category.categoryIcon.slice(6)} size={22} style={{ backgroundColor: 'transparent', paddingHorizontal: 15 }} color='#423620' />

                                                        <Text numberOfLines={1}
                                                        style={{color: '#423620', fontSize: 14, fontWeight: '600'}}>
                                                            {category.categoryName.toUpperCase()}
                                                        </Text>
                                                    </View>
                                                    <View style={{transform: [{skewX: "30deg"}], width: '10%', backgroundColor:"#f4aa1c", marginLeft: -20, height: '100%'}} />

                                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'center'}}>
                                                            <TouchableOpacity onPress={() => {}}>
                                                              <Text style={[styles.avRegular, liveChannelStyle.browseAll],{color: "#f4aa1c"}}>
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
                                                            <View style={liveChannelStyle.imageThmbnailGames} key={gameIndex}>
                                                              <TouchableOpacity onPress={this._onPressGameButton.bind(this, {game: game})}>

                                                                  <View>
                                                                    <TouchableOpacity onPress={this._openHTML5Game} >
                                                                        <Image style={liveChannelStyle.imageGame} resizeMode="stretch" source={{uri: game.gameImage }} ></Image>
                                                                    </TouchableOpacity>
                                                                  </View>

                                                                  <View>
                                                                    <Text style={{color: 'white'}}> Sagar </Text>
                                                                    <Text style={{color: 'white'}}> Sagar </Text>
                                                                  </View>

                                                                  <View>
                                                                    <Text style={{color: 'white'}}> Sagar </Text>
                                                                    <Text style={{color: 'white'}}> Sagar </Text>
                                                                  </View>

                                                              </TouchableOpacity>

                                                            </View>
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
                        <Text style={{color: 'white'}}> Favorites Screen </Text>
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
                    isTitle= {Globals.url !==  'http://uk.mobiotv.com' ? true : false}
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
    console.log("mapStateoProps here");
    console.log(state.GamesReducer);
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
        getCategories,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VOD);
