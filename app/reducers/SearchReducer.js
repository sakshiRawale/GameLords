import * as action_types from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    searchText: ""
};

export const SearchReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SEARCH_TEXT:
            return {
                ...state,
                searchText: action.data.text
            };
        default:
            return state;
    }
};
