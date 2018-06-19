import React, { Component } from "react";
import { Image, View, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Globals from '../../constants/Globals';
// Components

// Styles
import { styles } from "../../style/appStyles";
import bannerStyles from "../../style/bannerStyles";

// Other data / functions
import * as BannerImg from "../../assets/Images";
import NavigationService from "../../utils/NavigationService";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.renderDot = this.renderDot.bind(this);
        this.renderActiveDot = this.renderActiveDot.bind(this);
    }

    renderDot() {
        return (
            <View style={[bannerStyles.dots]} />
        )
    }

    renderActiveDot() {
        return (
            <View style={[bannerStyles.dotsActive]} />
        )
    }

    render() {
        return (
          <View style={bannerStyles.indicatorViewPage}>
              <Image style={[bannerStyles.slides]} resizeMode="contain"  source={ BannerImg.bannerImg } ></Image>
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
