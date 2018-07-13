import * as action_types from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    isLoading: false
};

export const ActivityIndicatorReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.IS_LOADING:
            return {
                isLoading: action.data.isLoading
            };
        default:
            return state;
    }
};