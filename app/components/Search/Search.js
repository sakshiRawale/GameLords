import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchStyles from "../../style/searchStyle";
import { Keyboard, Dimensions, Platform, Modal, Image, View, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, TouchableOpacity } from "react-native";
import { Container, Content, Header, Item, Button, Input } from "native-base";
import * as vars  from '../../constants/api';
import axios from 'axios';
import { showSearchBar, HideSearchBar, onShowSearchView } from '../../actions/HeaderActions';
import { searchText } from '../../actions/SearchActions';
import { console_log } from '../../utils/helper';
import { styles } from "../../style/appStyles";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import NavigationService from '../../utils/NavigationService';
import Footer from '../Footer/Footer';
import GameView from '../GameView/GameView';
import Globals from  '../../constants/Globals';
import { messages } from '../../constants/messages';
import MessageBar from '../../components/Message/Message';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.from,
            showSearchBar: false,
            searchText: '',
            message:'',
            showMessage:false,
        };
      }

    componentWillMount() {

    }

    componentWillUnmount() {
        this.props.searchText('');
    }

    onChange(text) {
        this.props.searchText(text);
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
        var regEx = new RegExp(this.props.search.searchText, 'i');
        let html5Search = [];

        if (this.props.games)
        {
          html5Search = this.props.games.games.filter((g) => {
             if (regEx.test(g.gameTitle) && g.gameType === 'HTML5') {
                 return g
             }
          });
        }

        return (
            this.props.header.searchView === true &&
            <View
                style={{flex: 1,
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
                <ScrollView style={[SearchStyles.content, {width: deviceWidth}]} keyboardShouldPersistTaps={'always'} keyboardDismissMode='on-drag' contentContainerStyle={{minHeight: Globals.IphoneX ?  Globals.deviceHeight - 140 : Globals.deviceHeight - 80 }}>
                <MessageBar showMessage={this.state.showMessage} color={this.state.color} message={this.state.message}/>

                <View style={{flex: 3}}>
                  {this.props.search.searchText !=='' &&
                      <View>

                        <View style={{paddingHorizontal: Globals.DeviceType === 'Phone'? 20: 30, marginTop: Globals.DeviceType === 'Phone'? 40: 80}}>
                          <View style={SearchStyles.gameListBox}>
                            <View style={SearchStyles.transformView}>
                              <Icon name={'rocket'} size={ Globals.DeviceType === 'Phone'? 22 : 40 } style={SearchStyles.iconStyle} color='#423620' />

                              <Text numberOfLines={1} style={SearchStyles.headingText}>
                                  {'GAME DIRECTORIES'}
                              </Text>
                            </View>
                            <View style={SearchStyles.viewAllStyle} />
                          </View>
                        </View>


                        {((this.state.type == '' || this.state.type == "html5")  && (html5Search.length > 0 )) &&
                          <View style={{backgroundColor: 'black', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15 }}>

                          {html5Search.map((game, gameIndex) => {
                            return (
                                  <GameView game={game} gameIndex={gameIndex} handleMessageBar={this.handleMessageBar} from = {'Search'} for='forFavoriteCategorySearch' />
                                )
                            })
                          }
                          </View>
                        }
                        {(html5Search.length <= 0 ) &&
                            <View style = {{alignItems : 'center', flex: 1}}>
                                <Text style={[styles.avRegular,SearchStyles.noSearchText]}>No Game Found</Text>
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
