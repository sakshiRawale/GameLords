import React, { Component } from "react";
import { Keyboard, Animated, StatusBar, Dimensions, Image, View, Text, TouchableHighlight, TouchableOpacity, Platform, TextInput, ImageBackground } from "react-native";
import { Header, Button, Body, Left, Right, Item, Input } from "native-base";
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavigationService from '../../utils/NavigationService';
import { playBackground } from "../../assets/Images";
// Styles
import { styles } from '../../style/appStyles';
import headerStyle from '../../style/headerStyle';
import { showSearchBar, HideSearchBar, onShowSearchView} from '../../actions/HeaderActions';
import { searchText } from '../../actions/SearchActions';
// Other data/helper functions
import { headerLogo } from "../../assets/Images";
import {console_log} from "../../utils/helper";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../../constants/Globals';

class PlayHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchBar: false,
            x: new Animated.Value(0),
        };
    }

    searchOpen() {
        this.slide();
        this.props.showSearchBar(!this.props.header.showSearchBar);
        this.props.HideSearchBar(false);
        this.props.onShowSearchView(true);
        this.clearText();
    }
    componentWillReceiveProps(newProps){
       // console.log('this.props.showSearchBar:', newProps.header.hideSearchBar);
        if(newProps.header.hideSearchBar){
            this.slideOut();
        }
    }

    clearText() {
        this.props.searchText('');
    }

    onChange(text) {
        this.props.searchText(text);
    }

    slide = () => {
        this.setState({x: deviceWidth});
        this.TextInput.focus();
        // Animated.timing(this.state.x, {
        //     toValue: deviceWidth,
        //     duration: 400,
        // }).start(()=> this.TextInput.focus());
    };

    slideOut = () => {
        this.setState({x: 0});
        this.TextInput.blur();
        // Animated.timing(this.state.x, {
        //     toValue: 0,
        //     duration: 300,
        // }).start(()=> this.TextInput.blur());
        //this.TextInput.blur();
    };

    _renderLeftSection() {
        const { isDrawer } = this.props;
        if (isDrawer) {
            return (
                <TouchableHighlight underlayColor="transparent" activeOpacity={0.2} style={headerStyle.iconsView} onPress={() => NavigationService.navigate("DrawerOpen")}>
                    <FeatherIcon name="menu" size={26} style={{ backgroundColor: 'transparent', marginLeft: 10 }} color="#fff" />
                </TouchableHighlight>
            )
        } else {
            return (
                <TouchableHighlight underlayColor="transparent" activeOpacity={0.2} style={headerStyle.iconsView} onPress={() => NavigationService.goBack()}>
                    <Icon name="angle-left" size={26} style={{ backgroundColor: 'transparent', marginLeft: 10 }} color="#fff" />
                </TouchableHighlight>
            )
        }
    }
    render() {
        const { isDrawer, isTitle, title, isSearch, rightLabel, rightClick } = this.props;
        return (
            <View style={[headerStyle.header, {backgroundColor: '#315687'}]}>
                <View style={[headerStyle.header, {flexDirection: 'row', justifyContent: 'center', backgroundColor: '#315687'}]}>
                    {Platform.OS == 'ios'?
                        <StatusBar backgroundColor="#fff" barStyle="light-content"/>
                        : <StatusBar backgroundColor="#315687" barStyle="light-content"/>}
                    <View style={headerStyle.headerBg}>
                        <View style={headerStyle.leftIconView}>
                            {this._renderLeftSection()}
                        </View>
                        <View style={ [headerStyle.titleView, {justifyContent: 'center', height: '100%'}]}>
                            {
                                isTitle ?
                                    <Text style={[styles.avRegular, headerStyle.title]}>{title}</Text>
                                    : <Image style={[headerStyle.logo]} source={headerLogo} />
                            }
                        </View>
                        <View style={ headerStyle.rightIconView}>
                            {
                                isSearch ?
                                    <TouchableHighlight onPress={this.searchOpen.bind(this)} underlayColor="transparent" activeOpacity={0.2} style={headerStyle.iconsView} >
                                        <FeatherIcon name="search" style = {{ marginLeft: Globals.DeviceType === 'Phone'? 10: 50}} size={24} color="#fff" />
                                    </TouchableHighlight>
                                    : <TouchableOpacity  onPress={() => {rightClick()}}>
                                        <Text style={[headerStyle.rightText]}>{rightLabel}</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
                <View searchBar style={[headerStyle.header, { right: 0, width : this.state.x, backgroundColor:'#000', position: 'absolute', zIndex: this.props.header.showSearchBar === false? 0 : 10 } ]}>

                <View searchBar style={[headerStyle.header, {flexDirection: 'row', backgroundColor: '#315687'}]}>
                    {Platform.OS == 'ios'?
                        <StatusBar backgroundColor="#fff" barStyle="light-content"/>
                        : <StatusBar backgroundColor="#000000" barStyle="light-content"/>}
                    <View style={[headerStyle.headerSearch, {backgroundColor: '#315687'}]}>
                        <FeatherIcon color="#fff" size={20} name="search" style={headerStyle.searchIcn} />
                        <TextInput
                            value= {this.props.search.searchText}
                            underlineColorAndroid={'transparent'}
                            style={[headerStyle.searchTxt, {backgroundColor: '#315687'}]}
                            placeholder={Globals.type === 'es'? "Buscar.." : 'Search..'}
                            placeholderTextColor={'#fff'}
                            ref={(ref) => this.TextInput = ref}
                            onChangeText={(text)=> this.onChange(text)} />
                        <TouchableOpacity onPress={()=> { this.props.searchText(''); }}>
                            <Image source={require('../../assets/images/close.png')} style={{width: 15, height: 15, marginTop : Platform.OS == "ios" ? ((deviceHeight == 812) ? 19 : 11) : 11}}/>
                        </TouchableOpacity>
                    </View>
                    <Button style = {headerStyle.btn} onPress={()=>{this.props.showSearchBar(false); this.props.searchText(''); this.props.onShowSearchView(false); this.slideOut(); }} transparent>
                        <Text style={headerStyle.cancelTxt}>{Globals.type === 'es'? "Cancelar" : "Cancel"}</Text>
                    </Button>
                </View>
                </View>
            </View>

        );
    }
}


const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayHeader);
