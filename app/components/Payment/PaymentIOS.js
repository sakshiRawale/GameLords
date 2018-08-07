import React, { Component } from "react";
import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules
//import  {InAppUtils} from 'react-native-in-app-utils';

export const PaymentIOS = () => {

    var productIdentifiers = [
        'com.GameLords.app',
    ];

     InAppUtils.loadProducts(productIdentifiers,(errorOuter, product) => {
         InAppUtils.purchaseProduct(productIdentifiers[0], (errorInner, response) => {
             if(response && response.productIdentifier) {
                 alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
             }
         });
    });
    InAppUtils.canMakePayments((canMakePayments) => {
        if(!canMakePayments) {
            Alert.alert('Not Allowed', 'This device is not allowed to make purchases. Please check restrictions on device');
        }
    });
}
