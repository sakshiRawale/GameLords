import React, { Component } from 'react';
import { Image, View, TouchableHighlight, Text, ImageBackground, ScrollView, Switch, TouchableOpacity } from "react-native";

// styles
import { styles } from "../../style/appStyles";
import WelcomeStyle from "../../style/welcomeStyle";

class CategoryList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { category, index } = this.props;

        return (
            <View style={WelcomeStyle.imageThmbnailCategory} key={index}>
                <TouchableOpacity onPress={() => this.props.viewCategoryGames(category)} >
                    <ImageBackground style={WelcomeStyle.imageBackgroundCategory} source={{ uri: category.categoryImage }}>
                    </ImageBackground>
                    <Text style={[styles.avRegular, WelcomeStyle.categoryNameText]}>{category.categoryName}</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

export default CategoryList;
