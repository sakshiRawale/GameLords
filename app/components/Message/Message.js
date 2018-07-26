import React, { Component } from "react";
import { Image, View, Text, TouchableHighlight, Animated } from "react-native";
import { styles } from "../../style/appStyles";
import Globals from "../../constants/Globals";
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
class MessageBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.showMessage !== this.props.showMessage) {
            MessageBarManager.registerMessageBar(this.refs.alert);
            MessageBarManager.showAlert({
                message: newProps.message,
                alertType: newProps.color == 'green' ? 'success' : 'error',
                messageStyle: { fontSize: Globals.DeviceType === 'Phone' ? 12 : 14, textAlign: 'center', fontFamily: 'AvenirNextLTW01RegularRegular' },
                duration: 2000
            });
        }
    }
    render() {
        return (
            <View style={{ position: 'absolute', backgroundColor: 'transparent', marginTop: 0, height: 40, zIndex: 100, width: '100%' }}>
                <MessageBarAlert
                    ref="alert"
                />
            </View>
        );
    }
}
export default MessageBar;
