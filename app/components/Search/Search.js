import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HistoryStyles from "../../style/historyStyle";
import headerStyle from "../../style/headerStyle";
import { Keyboard, Dimensions, Platform, Modal, Image, View, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, TouchableOpacity } from "react-native";
import { Container, Content, Header, Item, Button, Input } from "native-base";
import { movies } from '../../constants/movies';
import { bidiotvMoviesData } from '../../constants/bidiotvmovies';
import { esmobiotv } from '../../constants/esmobiotv';
import * as vars  from '../../constants/api';
import axios from 'axios';
import { showSearchBar, HideSearchBar, onShowSearchView } from '../../actions/HeaderActions';
import { searchText } from '../../actions/SearchActions';
import { getVideoOrChannelRelatedData } from '../../actions/PlayActions';
import { console_log } from '../../utils/helper';
import {thumbnail} from "../../assets/Images";
import { styles } from "../../style/appStyles";
import liveChannelStyle from "../../style/liveChannelStyle";
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import NavigationService from '../../utils/NavigationService';
import Footer from '../Footer/Footer';
import Globals from  '../../constants/Globals';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

let bidiotvMovies = Globals.type === 'es' ?  esmobiotv : bidiotvMoviesData;

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.from,
            showSearchBar: false,
            searchText: '',
        };

        this.goToPlay = this.goToPlay.bind(this);
        this.goToPlayOthers = this.goToPlayOthers.bind(this);
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        this.props.searchText('');
    }

    goToPlay(data) {
        this.props.getVideoOrChannelRelatedData(data);
        if (this.state.type === 'channels') {
            NavigationService.navigate('Play');
        } else {
            NavigationService.navigate('PlayOthers');
        }
        this.props.HideSearchBar(true);
        this.props.showSearchBar(false);
        this.props.onShowSearchView(false);
        this.props.searchText('');
    }

    goToPlayOthers(data) {

        this.props.getVideoOrChannelRelatedData(data);
        NavigationService.navigate('PlayVOD');
        this.props.HideSearchBar(true);
        this.props.showSearchBar(false);
        this.props.onShowSearchView(false);
        this.props.searchText('');
    }

    goToPlayBiodtv(data) {
        this.props.getVideoOrChannelRelatedData(data);
        Globals.type === 'es' ?  NavigationService.navigate('PlayVOD') :  NavigationService.navigate('PlayOthers');
        this.props.HideSearchBar(true);
        this.props.showSearchBar(false);
        this.props.onShowSearchView(false);
        this.props.searchText('');
    }

    onChange(text) {
        this.props.searchText(text);
    }


    render() {
        var regEx = new RegExp(this.props.search.searchText, 'i');
        let channelSearch, videoSearch , recentSearch,bidiotvsearch;
        if(Globals.url ===  'http://uk.mobiotv.com'){
            bidiotvsearch = [].concat.apply([], bidiotvMovies.map((c) => c.videos)
            ).filter((v) => {
                if (regEx.test(v.name)) {
                    return v;
                }
            });
        }
        else{
             channelSearch = this.props.category.channels.filter((channel) => {
                if (regEx.test(channel.channelName)) {
                    return channel
                }
            });

             videoSearch = [].concat.apply([], this.props.category.videos.map((c) => c.videos)).filter((v) => {
                if (regEx.test(v.name)) {
                    return v;
                }
            });

             recentSearch = [].concat.apply([], movies.map((c) => c.videos)).filter((v) => {
                if (regEx.test(v.name)) {
                    return v;
                }
            });
        }


        //console_log('this.props.search.searchText**', (this.props.search.searchText !==''))

        return (
            this.props.header.searchView === true?
            <View
                style={{flex: 1,
                    backgroundColor: '#000',
                    top: Platform.OS == "ios" ? ((deviceHeight == 812) ? 95 : 65) : 45,
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

                <ScrollView style={[HistoryStyles.content, {width: deviceWidth}]} keyboardShouldPersistTaps={'always'} keyboardDismissMode='on-drag' contentContainerStyle={{minHeight: Globals.IphoneX ?  Globals.deviceHeight - 140 : Globals.deviceHeight - 80 }}>
                    <View style={{flex: 3}}>
                    {this.props.search.searchText !=='' ?
                        <View  style={{
                            //top: Platform.OS == "ios" ? ((deviceHeight == 812) ? 95 : 65) : 45,

                        }} >
                    <View style={[HistoryStyles.historyContent, Globals.type === 'es' ? {backgroundColor: '#000', flexDirection: 'row', flexWrap: 'wrap',paddingTop: 10, paddingLeft: 0, paddingRight: 0, flex: 3}: { flex: 3}]}>
                        {bidiotvsearch?
                            bidiotvsearch.length !==0 ?
                            bidiotvsearch.map((video, index) => {
                                return (
                                    Globals.type == 'es' ?
                                    <View style={liveChannelStyle.imageSearchVideoThmbnail}
                                          key={index}>
                                        <TouchableOpacity onPress={this.goToPlayBiodtv.bind(this, {video: video})}>
                                            <ImageBackground style={[liveChannelStyle.imageVideoListBackground]} resizeMode= 'stretch' source={video.preview}>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                        :
                                        <View style={HistoryStyles.historyItem} key={index} onPress={this.goToPlayBiodtv.bind(this, {video: video})}>
                                            <View style={{ flex: 2 }}>
                                                <TouchableOpacity style = {{ marginTop: 10, marginBottom: 10 }} onPress={this.goToPlayBiodtv.bind(this, {video: video})}>
                                                    <ImageBackground style={HistoryStyles.imageBackground_BD} resizeMode= 'stretch' source={video.preview}>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity style={HistoryStyles.historyTitle} onPress={this.goToPlayBiodtv.bind(this, {video: video})}>
                                                <Text
                                                    style={[styles.avRegular, HistoryStyles.historyItemTitle]}>{video.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                )
                            })
                                :
                                <View style = {{alignItems : 'center', flex: 1}}>
                                    <Text style={[styles.avRegular, {color: '#fff', marginTop: 20, alignSelf: 'center'}]}>No Results Found</Text>
                                </View>
                            : null
                        }
                        {(Globals.url !==  'http://uk.mobiotv.com' && (this.state.type == '' || this.state.type == "channels")  && channelSearch.length > 0)?
                            <View>
                                <View>
                                    <Text style = {{color: '#d51a92'}}>Live Channels</Text>
                                </View>
                            <View>
                            {channelSearch?
                                channelSearch.map((channel, index) => {
                                    return (
                                        <TouchableOpacity style={HistoryStyles.historyItem} key={index} onPress={this.goToPlay.bind(this, {channel: channel})}>
                                            <View style={{ flex: 1 }}>
                                                <TouchableOpacity style = {{ marginTop: 10, marginBottom: 10 }} onPress={this.goToPlay.bind(this, {channel: channel})}>
                                                    <ImageBackground style={HistoryStyles.imageBackground} source={channel.channelImage ? {uri: vars.BASE_URL+"uploads/"+channel.channelImage} : thumbnail}>
                                                        <View style={HistoryStyles.bgOpacity}>
                                                            <Image style={HistoryStyles.channelLogo} source={{uri:channel.channelLogo}}/>
                                                        </View>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={HistoryStyles.historyTitle}>
                                                <Text
                                                    style={[styles.avRegular, HistoryStyles.historyItemTitle]}>{channel.channelName}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                                : null
                            }
                        </View>
                    </View>
                    : null
                }
                {(Globals.url !==  'http://uk.mobiotv.com' && (this.state.type == '' || this.state.type == "videos")  && (videoSearch.length > 0 || recentSearch.length > 0))?
                    <View>
                        <View>
                            <Text style = {{color: '#d51a92'}}>Video on Demand</Text>
                        </View>
                        <View>
                            {videoSearch?
                                videoSearch.map((video, index) => {
                                    return (
                                        <TouchableOpacity style={HistoryStyles.historyItem} key={index} onPress={this.goToPlay.bind(this, {video: video})}>
                                            <View style={{ flex: 1 }}>
                                                <TouchableOpacity style = {{ marginTop: 10, marginBottom: 10 }} onPress={this.goToPlay.bind(this, {video: video})}>
                                                    <ImageBackground style={HistoryStyles.imageBackground} source={{uri: video.preview}}>
                                                        <View style={{flex: 1, backgroundColor: "rgba(0,0,0,.5)"}}/>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={HistoryStyles.historyTitle}>
                                                <Text
                                                    style={[styles.avRegular, HistoryStyles.historyItemTitle]}>{video.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                                : null
                            }
                            {recentSearch?
                                recentSearch.map((video, index) => {
                                    return (
                                        <TouchableOpacity style={HistoryStyles.historyItem} key={index} onPress={this.goToPlayOthers.bind(this, {video: video})}>
                                            <View style={{ flex: 1 }}>
                                                <TouchableOpacity style = {{ marginTop: 10, marginBottom: 10 }} onPress={this.goToPlayOthers.bind(this, {video: video})}>
                                                    <ImageBackground style={HistoryStyles.imageBackground} source={ video.preview }>
                                                        <View style={{flex: 1, backgroundColor: "rgba(0,0,0,.5)"}}/>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={HistoryStyles.historyTitle}>
                                                <Text
                                                    style={[styles.avRegular, HistoryStyles.historyItemTitle]}>{video.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                                : null
                            }
                        </View>
                    </View>
                    : null
                }
                {Globals.url !==  'http://uk.mobiotv.com' && (channelSearch.length <= 0 && videoSearch.length <=0 && recentSearch.length <= 0)?
                    <View style = {{alignItems : 'center', flex: 1}}>
                        <Text style={[styles.avRegular, {color: '#fff', marginTop: 20, alignSelf: 'center'}]}>No Results Found</Text>
                    </View>
                    : null
                }
                    </View>

            </View>
                : null}

                    </View>
                    <Footer />
                </ScrollView>
            </View>
                :null
        )
    }
}

const mapStateToProps = (state) => {
    return {
       category: state.CategoryReducer,
        country: state.CountryReducer,
        favorite: state.FavoriteReducer,
        header: state.HeaderReducer,
        historyVideos: state.HistoryReducer,
        play: state.PlayReducer,
        search: state.SearchReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        searchText,
        getVideoOrChannelRelatedData,
        showSearchBar,
        HideSearchBar,
        onShowSearchView
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
