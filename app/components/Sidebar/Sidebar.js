import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Image, View, Text, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

// Components

// Styles
import { styles } from "../../style/appStyles";
import sidebarStyles from "../../style/sidebarStyles";

// Other data/functions
import { background, avatar, thumbnail1 } from "../../assets/Images";
import NavigationService from '../../utils/NavigationService';
import { console_log } from '../../utils/helper';
import * as vars from '../../constants/api';

let menuArray = [];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showNotification: false,
			newProfilePic: ''

		};
		this.menuClicked = this.menuClicked.bind(this);
		this.openAccountsPage = this.openAccountsPage.bind(this);
	}

	componentWillMount(){
    menuArray = [
        { menuName: 'Home', iconName: 'home', icon: 'FA', route: 'Home' },
        { menuName: 'My Account', iconName: 'user-circle', icon: 'FA', route: 'Accounts' },
				{ menuName: 'Notifications', iconName: 'notifications-active', icon: 'material', route: 'Notification' },
        { menuName: 'HTML Games', iconName: 'html5', icon: 'FA', route: 'HtmlGames' },
				{ menuName: 'Favorite', iconName: 'star', icon: 'FA', route: 'Favorite' },
    ]

	}

  componentDidMount(){
      this.setState({profilePic: (this.props.account.user.profilePic) ? vars.BASE_URL_PP +'uploads/'+this.props.account.user.profilePic : 'http://43.241.63.15:3003/uploads/1520249460987_thumbnail-3.jpg'})
  }

	componentWillReceiveProps(newProps){
        //console.log(newProps.account.user.profilePic, '*before**',this.state.profilePic )
		if(newProps.account.user.profilePic !== this.state.profilePic){
			//console.log(newProps.account.user.profilePic, '***',this.state.profilePic )
			this.setState({profilePic: vars.BASE_URL_PP+'uploads/' + newProps.account.user.profilePic, newProfilePic: 'sd'});
		}
			//console.log('newProps:', newProps.account.user.profilePic);
	}

	menuClicked(route, event) {
		if(route !== 'Notification'){
            NavigationService.navigate("DrawerClose");
            if (this.props.activeItemKey != route) {
                NavigationService.navigate(route);
            }
		}
		else{
			this.setState({showNotification: !this.state.showNotification});
		}

	}

	openAccountsPage() {
        NavigationService.navigate("DrawerClose");
	    NavigationService.navigate("Accounts");
    }

	renderIcon(icon, iconName) {
		switch (icon) {
			case 'feather':
				return (
					<FeatherIcon name={iconName} size={24} style={{ backgroundColor: 'transparent' }} color="#fff" />
				);
				break;
			case 'FA':
				return (
					<Icon name={iconName} size={24} style={{ backgroundColor: 'transparent' }} color="#fff" />
				);
				break;
			case 'material':
				return (
					<MaterialIcon name={iconName} size={24} style={{ backgroundColor: 'transparent' }} color="#fff" />
				);
				break;

			default:
				break;
		}

	}

	render() {

		return (

			<View style={sidebarStyles.drawerView}>
				<ImageBackground source={background} style={{flex: 1}}>
					<TouchableOpacity style={sidebarStyles.avtarStyle} onPress={() => this.openAccountsPage()}>
						{this.state.profilePic !== this.state.newProfilePic ? <Image style={sidebarStyles.cover} source={{uri: this.state.profilePic, cache: 'reload'}} /> : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openAccountsPage()}>
                        <Text style={sidebarStyles.userName}>
                            {this.props.account.user.name}
                        </Text>
                    </TouchableOpacity>

					<View style={sidebarStyles.menuView}>
						<ScrollView>
							{
								menuArray.map((menu, index) => {
									const route = menu.route;
									return (
										<TouchableOpacity key={index} onPress={this.menuClicked.bind(this, route)}>
											<View style={sidebarStyles.menuStyle} key={index}>
												<View style={sidebarStyles.iconView}>
													{
														this.renderIcon(menu.icon, menu.iconName)
													}
												</View>
												<View style={sidebarStyles.menuTextView}>
													<Text style={[styles.avRegular, sidebarStyles.menuText]}>
														{menu.menuName}
													</Text>
													{menu.menuName === 'Notifications' ?
													 <View style = {sidebarStyles.notificationContainer}>
													 	{/*<View style= {[sidebarStyles.notificationBadge]}>*/}
													 		{/*<Text style = {sidebarStyles.notificationTxt}>1</Text>*/}
														 {/*</View>*/}
													 	<Icon name="angle-down" size={28} style={[sidebarStyles.notificationDownArow, {transform: [{ rotate: this.state.showNotification ? '180deg' : '0deg' }]}]} color="#fff" />
													 </View>
													 : null}
												</View>
											</View>
                                            {menu.menuName === 'Notifications' ?
												this.state.showNotification ?
													<View style={sidebarStyles.menuStyle} key={index + 2}>
														{/*<Image style = {{marginLeft: 10, height: 35, width: 50}} source={thumbnail1}/>*/}
														<Text style={[styles.avRegular, sidebarStyles.menuText, {marginLeft: 30, }]}>
                                                            {"No Notifications"}
														</Text>
													</View>
                                                    : null
                                            : null}
										</TouchableOpacity>
									)
								})
							}
						</ScrollView>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.WelcomeReducer.token,
        account: state.AccountReducer,
        category: state.CategoryReducer,
        favorite: state.FavoriteReducer,
        flashmessage: state.FlashMessageReducer,
        loader: state.ActivityIndicatorReducer,
        splash: state.SplashScreenReducer,
        user: state.AuthenticationReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
