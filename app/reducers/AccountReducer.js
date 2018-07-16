import * as action_types from '../actions/action_types';
import { console_log } from '../utils/helper';

var initialState = {
    user: {},
    interests: []
};

export const AccountReducer = (state = initialState, action = {}) => {
    //console_log(action.type, action.data);
    switch (action.type) {
        case action_types.GET_DETAILS:
            return {
                ...state,
                user: action.data.user
            };
        case action_types.SET_DETAILS:
            return {
                ...state,
                user: action.data.user
            };
        case action_types.GET_INTERESTS:
            return {
                ...state,
                interests: action.data.interests
            };
        case action_types.SET_PROFILE_PIC:
            return {
                ...state,
                user: {
                    ...state.user,
                    profilePic: action.data.profilePic
                }
            };
        default:
            return state;
    }
};
