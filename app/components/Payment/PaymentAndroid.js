import React, { Component } from "react";
import InAppBilling from "react-native-billing";

export const PaymentAndroid = async(success, error) => {

    await InAppBilling.close();
    try {
        await InAppBilling.open();
        if (!await InAppBilling.isSubscribed("ten_dollar_gamelords")) {
            const details = await InAppBilling.subscribe("ten_dollar_gamelords");
            success(details);
        }
        else{
              success( await InAppBilling.getSubscriptionTransactionDetails("ten_dollar_gamelords"));
        }
    } catch (err) {
        console.log('error:', err);
        error(err);
    } finally {
        await InAppBilling.close();
    }

}
