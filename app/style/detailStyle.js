import { StyleSheet, Platform, Dimensions } from "react-native";
import * as FontSizes from "../utils/fontsSizes";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Globals from '../constants/Globals';

export default detailStyle = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000'
  },
  gameListBox: {
    height: Globals.DeviceType === 'Phone' ? 45 : 65,
    flexDirection: 'row',
    // backgroundColor: '#000000',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    borderBottomColor: "#f4aa1c",
    borderBottomWidth: 1,
  },
  transformView: {
    flexDirection: 'row',
    backgroundColor: '#f4aa1c',
    paddingHorizontal: Globals.DeviceType === 'Phone' ? 15 : 20
  },
  iconStyle: {
    backgroundColor: 'transparent',
    // paddingHorizontal: 15
  },
  headingText: {
    alignSelf: 'center',
    color: '#423620',
    fontWeight: '600',
    fontSize: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? FontSizes.medium : FontSizes.medium) : FontSizes.medium) : FontSizes.xLarge,
  },
  viewAllStyle: {
    transform: Platform.OS == "ios" ? [{ skewX: "30deg" }] : [{ skewY: "30deg" }, { rotate: '135deg' }],
    width: Globals.DeviceType === 'Phone' ? '18%' : '10%',
    backgroundColor: "#f4aa1c",
    // backgroundColor:"red",
    marginLeft: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? -12 : -12) : -14) : -18, //Platform.OS == "ios" ? -18 :  -27,
    height: '100%',
  },
  gameImage: {
    height: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceHeight / 4.5 : deviceHeight / 3.7) : deviceHeight / 3.7) : deviceHeight / 3.7,
    width: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceWidth / 2.1 : deviceWidth / 2.1) : deviceWidth / 2.1) : deviceWidth / 2.8,
  },
  imageGameStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  detailViewStyle: {
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    paddingTop: Globals.DeviceType === 'Phone' ? 15 : 25,
  },
  shadowViewTop: {
    height: Globals.DeviceType === 'Phone' ? 5 : 10,
    shadowOffset: { width: 0, height: 5, },
    // shadowColor: '#fff',
    backgroundColor: '#000000',
    shadowColor: '#000000',
    shadowOpacity: 1,
    elevation: 1,
  },
  shadowViewBottom: {
    height: Globals.DeviceType === 'Phone' ? 5 : 10,
    shadowOffset: { width: 0, height: -5, },
    // shadowColor: '#fff',
    backgroundColor: '#000000',
    shadowColor: '#000000',
    shadowOpacity: 1,
    elevation: 1,
  },
  gameTextStyle: {
    color: '#FFFFFF',
    fontSize: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? FontSizes.xLarge : FontSizes.xLarge) : FontSizes.xLarge) : FontSizes.xxLarge,
    fontWeight: '600',
  },
  gameDetailTextStyle: {
    color: '#FFFFFF',
    fontSize: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? FontSizes.medium : FontSizes.small) : FontSizes.small) : FontSizes.medium,
  },
  relatedStyle: {
    flexDirection: 'row',
  },
  iconRatingStyle: {
    backgroundColor: 'transparent',
    paddingHorizontal: 2,
    paddingVertical: 2
  },
  gameDetailsView: {
    paddingVertical: Globals.DeviceType === 'Phone' ? 20 : 30,
  },
  gameDetailsViewCol: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  gameDetailsViewColFavLikeIcon: {
    width: Globals.DeviceType === 'Phone' ? deviceWidth / 3 : deviceWidth / 3,
  },
  gameDetailsViewColFavLike: {
    width: Globals.DeviceType === 'Phone' ? deviceWidth / 2.6 : deviceWidth / 2.7,
  },
  gameDetailsViewLeft: {
    width: '28%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  gameDetailsViewRight: {
    width: '72%',
    paddingHorizontal: 10
  },
  gameDetailsDescription: {
    textAlign: 'justify',
  },
  gameDetailsViewFavRate: {
    width: Globals.DeviceType === 'Phone' ? '100%' : '80%',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  gameFavRateIcon: {
    zIndex: 1,
    // paddingHorizontal: 25
  },
  gameFavRateText: {
    marginRight: 25
  },
  viewAllViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  browseAll: {
    color: '#f4aa1c',
    fontSize: FontSizes.medium,
  },
  gameDetailPlayGameTextStyle: {
    color: '#FFFFFF',
    fontSize: FontSizes.xLarge,
  },
  gamePlayGameViewCol: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  gamePlayGameView: {
    width: Globals.DeviceType === 'Phone' ? (Platform.OS == "ios" ? ((deviceHeight === 812) ? deviceWidth / 2 : deviceWidth / 1.9) : deviceWidth / 1.8) : deviceWidth / 2.2,
    paddingVertical: Globals.DeviceType === 'Phone' ? 20 : 30,
    justifyContent: 'center',
    backgroundColor: '#a92d2d',
    alignItems: 'center',
    borderRadius: 10
  },
  gameDetailsViewPlayGameRight: {
    alignItems: 'center',
  },
  gameViewAllView: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    width: '80%',
    borderBottomColor: "#f4aa1c",
    paddingRight: 20
  },
  gameViewAllText: {
    justifyContent: "center",
    alignItems: 'center'
  },
  gameDetailView: {
    flex: 3,
    width: '100%',
    // backgroundColor: 'rgba(0,0,0, 0.8)',
    // paddingTop: Globals.DeviceType === 'Phone'? 15 : 25,
  },
});
