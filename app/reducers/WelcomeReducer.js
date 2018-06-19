import * as action_types from '../actions/action_types';
import { console_log } from '../utils/helper';

var initialState = {
    uid: '',
    token: ''
};

export const WelcomeReducer = (state = initialState, action = {}) => {
    console.log(action)
    switch (action.type) {
        case action_types.HAS_ACCESS:
            return {
                ...state,
                token: action.token
            };
        case action_types.ADD_UID:
            return {
                ...state,
                uid: action.data.uid
            };
        default:
            return state;
    }
};
