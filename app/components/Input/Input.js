import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';

// Styles
import styles from '../../style/inputStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container,this.props.heightstyle]}>
                {
                    this.props.icon ?
                        <Icon style={styles.icon} name={this.props.icon} />
                        : null
                }
                <Text style={[styles.avRegular,styles.errorText]}>{this.props.errorText}</Text>
                <TextInput
                    style={[styles.input,this.props.style]}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : "default"}
                    secureTextEntry={this.props.secureTextEntry ? true : false}
                    placeholderTextColor={this.props.placeholderColor ? this.props.placeholderColor : "#FFDB00"}
                    defaultValue={this.props.defaultValue ? this.props.defaultValue : null}
                    autoCapitalize={this.props.autoCapitalize}
                    multiline={this.props.multiline ? this.props.multiline : false}
                    maxLength={this.props.maxLength ? this.props.maxLength : null}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        )
    }
}
