import * as action_types from '../actions/action_types';
import { console_log } from '../utils/helper';

var initialState = {
    isAuthenticated: false,
    isAdmin: false
};

export const AuthenticationReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.LOGIN:
            return {
                ...state
            };
        default:
            return state;
    }
};