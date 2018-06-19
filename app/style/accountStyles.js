import { StyleSheet, Platform, Dimensions } from "react-native";
import * as FontSizes from "../utils/fontsSizes";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default (accountStyles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  viewWrapper: {
    flex: 3,
    flexDirection: "row",
    paddingLeft: "4%",
    paddingRight: "4%"
  },
  sectionHeaders: {
    color: "#d51a92",
    fontSize: FontSizes.small
  },
  sectionSubHeaders: {
    color: "#ffffff",
    fontSize: FontSizes.small
  },
  radioView: {
    flexDirection: "row",
    alignItems: "center",
      height: 28,
    //marginTop: "3%"
  },
  logoView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  inputView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "3%"
  },
  loginButtonView: {
    flex: 1,
    alignItems: "center"
  },
  loginButton: {
    backgroundColor: "#f00b64",
    width: deviceWidth / 1.2,
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    borderRadius: 15,
    justifyContent: "center"
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22
  },
  input: {
    color: "#606060",
    fontSize: FontSizes.small,
    width: "100%",
    marginTop: Platform.OS == "ios" ? 5 : null
  },
  usernameView: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    flexDirection: "row",
    borderBottomColor: "#606060",
    borderBottomWidth: 1,
    height: Platform.OS == "ios" ? 25 : 35
  },
  userNameText: {
    color: "#bbb",
    alignSelf: "flex-start",
    fontSize: FontSizes.small
  },
  avtarStyle: {
    marginTop: 50,
    width: deviceWidth / 3.2,
    height: deviceWidth / 3.2,
    borderWidth: 3,
    borderColor: "#ffffff",
    borderRadius: deviceWidth / 6.4,
    justifyContent: "center",
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: "transparent"
  },
  cover: {
    flex: 1,
    resizeMode: "cover"
  },
  categoryText: {
    color: "#8c8c8c",
    paddingLeft: "10%",
    fontSize: FontSizes.small
  },
  checkboxVw: { backgroundColor: "transparent", borderColor: "transparent" }
}));
