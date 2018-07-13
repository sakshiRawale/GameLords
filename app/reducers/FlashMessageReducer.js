import * as action_types from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    isShowing: false,
    message: '',
    type: true
};

export const FlashMessageReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SHOW_MESSAGE:
            return {
                ...state,
                isShowing: action.data.isShowing,
                message: action.data.message,
                type: action.data.type
            };
        case action_types.HIDE_MESSAGE:
            return {
                ...state,
                isShowing: action.data.isShowing
            };
        default:
            return state;
    }
};