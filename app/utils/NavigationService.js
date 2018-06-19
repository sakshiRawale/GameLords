import { NavigationActions } from 'react-navigation';

let _navigator;

let setTopLevelNavigator = (navigatorRef) => {
    _navigator = navigatorRef
};

let navigate = (routeName, params) => {
    _navigator.dispatch(
        NavigationActions.navigate({
            type: NavigationActions.NAVIGATE,
            routeName,
            params
        })
    );
};

let reset = (routeName, params) => {
    _navigator.dispatch(
        NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: routeName,
                params: params
            })]
        })
    )
};

let goBack = () => {
    _navigator.dispatch(
        NavigationActions.back()
    );
};

export default NavigationService = {
    navigate,
    setTopLevelNavigator,
    reset,
    goBack
};
