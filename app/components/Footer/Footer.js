import React, { Component } from "react";
import { Image, View, Text, TouchableHighlight } from "react-native";

// Styles
import { styles } from "../../style/appStyles";
import footerStyle from "../../style/footerStyle";

// Other data/helper functions
import Globals from '../../constants/Globals';
import { console_log } from "../../utils/helper";
import NavigationService from '../../utils/NavigationService';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.clickedButton = this.clickedButton.bind(this);
    }

    onClickFooter(screen) {
        if (this.props.from !== screen) {
            this.clickedButton(screen);
        }
    }

    clickedButton(screen) {
        NavigationService.navigate("StaticScreens", { from: screen });
    }

    render() {
        return (
            <View style={footerStyle.footerView}>
                <View>
                    <Text style={[styles.avRegular, footerStyle.footerCopyRightsText, { paddingTop: 5 }]}>{'2018 © GameLords. All Rights Reserved.'}</Text>
                </View>
            </View>
        );
    }
}

export default Footer;
