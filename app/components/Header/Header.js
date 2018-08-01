import React, { Component } from "react";
import { Keyboard, Animated, StatusBar, Dimensions, Image, View, Text, TouchableHighlight, TouchableOpacity, Platform, TextInput } from "react-native";
import { Header, Button, Body, Left, Right, Item, Input } from "native-base";
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavigationService from '../../utils/NavigationService';

// Styles
import { styles } from '../../style/appStyles';
import headerStyle from '../../style/headerStyle';
import { showSearchBar, HideSearchBar, onShowSearchView } from '../../actions/HeaderActions';
import { searchText } from '../../actions/SearchActions';
// Other data/helper functions
import { headerLogo, loginLogo } from "../../assets/Images";
import { console_log } from "../../utils/helper";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../../constants/Globals';


class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchBar: false,
            x: new Animated.Value(0),
            propsSearchBar: this.props.header.showSearchBar,
            status: false,
        };
    }

    searchOpen() {
        this.slide();
        this.props.showSearchBar(!this.props.header.showSearchBar);
        this.props.HideSearchBar(false);
        this.props.onShowSearchView(true);
        if (this.state.status) {
            this.props.statusHeader();
            this.setState({
                status: false
            });
        }
        this.clearText();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.hideHeader) {
            this.slideOut();
            this.setState({
                status: true
            });
        }

        //console.log('this.props.showSearchBar:', newProps.header.hideSearchBar);
        // if(newProps.header.hideSearchBar){
        //     this.slideOut();
        //     this.setState({
        //         status: false
        //       });
        // }
    }

    clearText() {
        this.props.searchText('');
    }

    onChange(text) {
        this.props.searchText(text);
    }

    _renderLeftSection() {
        const { isDrawer } = this.props;
        if (isDrawer) {
            return (
                <TouchableHighlight underlayColor="transparent" activeOpacity={0.2} style={[headerStyle.iconsView]} onPress={() => { NavigationService.navigate("DrawerOpen") }}>
                    <FeatherIcon name="menu" size={Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? 28 : 26) : 26) : 35} style={{ backgroundColor: 'transparent', marginLeft: Globals.DeviceType === 'Phone' ? 15 : 25 }} color="#f6a50e" />
                </TouchableHighlight>
            )
        } else {
            return (

                <TouchableHighlight underlayColor="transparent" activeOpacity={0.2} style={[headerStyle.iconsView]} onPress={() => { NavigationService.goBack(); }}>
                    <Icon name="angle-left" size={Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? 28 : 26) : 26) : 35} style={{ backgroundColor: 'transparent', marginLeft: Globals.DeviceType === 'Phone' ? 15 : 25 }} color="#f6a50e" />
                </TouchableHighlight>
            )
        }
    }


    slide = () => {
        this.setState({ x: deviceWidth });
        this.TextInput.focus();
    };

    slideOut = () => {
        this.setState({ x: 0 });
        this.TextInput.blur();
    };

    render() {
        const { isDrawer, isTitle, title, isSearch, rightLabel, rightClick } = this.props;
        return (
            <View style={headerStyle.header}>

                <View style={[headerStyle.header, { flexDirection: 'row', justifyContent: 'center' }]}>
                    {
                        Platform.OS == 'ios' ?
                            <StatusBar backgroundColor="#f6a50e" barStyle="light-content" />
                            :
                            <StatusBar backgroundColor="#000000" barStyle="light-content" />
                    }
                    <View style={headerStyle.headerBg}>
                        <View style={headerStyle.leftIconView}>
                            {this._renderLeftSection()}
                        </View>
                        <View style={[headerStyle.titleView]}>
                            {
                                isTitle ?
                                    <Text style={[styles.avRegular, headerStyle.title]}>{title}</Text>
                                    : <Image style={[headerStyle.logo]} source={loginLogo} />
                            }
                        </View>
                        <View style={headerStyle.rightIconView}>
                            {
                                isSearch ?
                                    <TouchableHighlight onPress={this.searchOpen.bind(this)} underlayColor="transparent" activeOpacity={0.2} style={[headerStyle.iconsView]} >
                                        <FeatherIcon style={{ marginLeft: Globals.DeviceType === 'Phone' ? 10 : 40 }} name="search" size={Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? 28 : 24) : 24) : 35} color="#f6a50e" />
                                    </TouchableHighlight>
                                    : <TouchableOpacity style={[headerStyle.iconsView]} onPress={() => { rightClick() }}>
                                        <Text style={[styles.avRegular, headerStyle.rightText]}>{rightLabel}</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
                <View searchBar style={[headerStyle.header, { right: 0, width: this.state.x, backgroundColor: '#000', position: 'absolute' }]}>
                    <View searchBar style={[headerStyle.header, { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Globals.DeviceType === 'Phone' ? 20 : 30 }]}>
                        {
                            Platform.OS == 'ios' ?
                                <StatusBar backgroundColor="#f6a50e" barStyle="light-content" />
                                :
                                <StatusBar backgroundColor="#000000" barStyle="light-content" />
                        }
                        <View style={headerStyle.headerSearch}>
                            <FeatherIcon color="#f6a50e" size={Globals.DeviceType === 'Phone' ? 20 : 30} name="search" style={headerStyle.searchIcn} />
                            <TextInput
                                value={this.props.search.searchText}
                                underlineColorAndroid={'transparent'}
                                style={headerStyle.searchTxt}
                                placeholder='Search..'
                                placeholderTextColor={'#fff'}
                                ref={(ref) => this.TextInput = ref}
                                onChangeText={(text) => this.onChange(text)} />
                            <TouchableOpacity onPress={() => { this.props.searchText(''); }}>
                                <Image source={require('../../assets/images/clear.png')} style={headerStyle.cancelIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={headerStyle.btn}>
                            <TouchableOpacity onPress={() => {
                                this.props.showSearchBar(false);
                                this.props.searchText('');
                                this.props.onShowSearchView(false);
                                this.slideOut();
                            }} transparent>
                                <Text style={[styles.avRegular, headerStyle.cancelTxt]}>Cancel</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
