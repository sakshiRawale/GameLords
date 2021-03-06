import React, { Component } from "react";
import { Image, View, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Styles
import { styles } from "../../style/appStyles";
import bannerStyles from "../../style/bannerStyles";

// Other data / functions
import Globals from '../../constants/Globals';
import * as BannerImg from "../../assets/Images";
import NavigationService from "../../utils/NavigationService";

class Banner extends Component {
    constructor(props) {
        super(props);
    }

    _openHTML5Game = () => {
        console.log("openHTML5Game click");
    }

    render() {
        return (
            <View style={bannerStyles.indicatorViewPage} >
                <TouchableOpacity onPress={this.props.openBannerHTML5Game}>
                    <Image style={[bannerStyles.bannerImage]} resizeMode="contain" source={BannerImg.bannerImg} ></Image>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
