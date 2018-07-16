import * as action_types from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    hideSplash: false
};

const SplashScreenReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.HIDE_SPLASH:
            return {
                hideSplash: action.data.hideSplash
            };
        default:
            return state;
    }
};

export default SplashScreenReducer;