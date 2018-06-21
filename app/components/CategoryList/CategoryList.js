import React, {Component} from 'react';
import { Image, View, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, TouchableOpacity } from "react-native";

import {connect} from "react-redux";

// import {bindActionCreators} from "redux/index";

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameType: props.gametype,
        };
    }

    componentDidMount() {

    }

    render(){
        console.log("==============");
        console.log(this.props.games);
        return (
            <View>
              <Text style={{color: 'white'}} > sagar </Text>
            </View>

        )
    }


}
const mapStateToProps = (state) => {
    return {
        categories: state.CategoryReducer,
        games: state.GamesReducer
    };
};

export default connect(mapStateToProps)(CategoryList);
