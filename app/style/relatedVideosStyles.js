import { StyleSheet } from  'react-native';
import * as FontSizes from '../utils/fontsSizes';
import Globals from '../constants/Globals';

export default relatedVideosStyles = StyleSheet.create({
    wrapperView:{
        borderTopColor: '#a4b7c1',
        borderTopWidth: 1,
        paddingHorizontal: '4%'
    },
    textAndSwitchView: {
        height: 40,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'space-between',
        //backgroundColor: 'black',
        alignItems: 'center'
    },
    headerText: {
        color: '#d51a92',
        fontSize: FontSizes.medium,
        //paddingLeft: 15
    },
    switchWrapper:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    subHeaderText: {
        color: 'white',
        fontSize: FontSizes.medium,
        paddingRight: '2%'
    },
    switch: {
        transform: [{ scaleX: .85 }, { scaleY: .75 }]
    },
    relatedItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#606060',
        borderBottomWidth: 1
    },
    titleIcon: {       
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5
    },
    imageWrapper: {
        flex: 2
    },
    imageWrapperVideo: {
        flex: 3
    },
    imageBackground:{
        width: Globals.DeviceType === 'Phone'? 75 : 122,
        height:  Globals.DeviceType === 'Phone'? 113 : 179,
        //marginLeft: 10
    },
    imageBackgroundVideo:{
        width: Globals.DeviceType === 'Phone'? 110 : 160,
        height:  Globals.DeviceType === 'Phone'? 65 : 115,
        //marginLeft: 10
    },
    relatedItemSubTitle: {
        color: 'white',
        //paddingLeft: '4%',
        width: '70%',
        fontSize: FontSizes.xSmall,
        color: '#777576'
    },
    relatedItemTitle: {
        color: 'white',
        fontSize: FontSizes.medium,
    },
    relatedItemTitleOther: {
        color: 'white',
        fontSize: FontSizes.small,
    },
    relatedItemIconWrapper: {
        flex: 1,
        alignItems: 'flex-end',      
        //backgroundColor: 'green',
        height: 30,
    },
    relatedItemIcon: {
        backgroundColor: 'transparent',
        marginRight: 5
    }
});