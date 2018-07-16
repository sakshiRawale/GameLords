import * as action_types from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    title: '',
    flagForBack: false,
    showSearchBar: false,
    hideSearchBar: false,
    searchView: false,
};

export const HeaderReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_HEADER_TITLE:
            return {
                ...state,
                title: action.data.title
            };
        case action_types.ON_BACK_CLICK:
            return {
                ...state,
                flagForBack: action.data
            };
        case action_types.RESET_BACK_CLICK:
            return {
                ...state,
                flagForBack: action.data
            };
        case action_types.SHOW_SEARCH:
            return {
                ...state,
                showSearchBar: action.data
            };
        case action_types.HIDE_SEARCH:
            return {
                ...state,
                hideSearchBar: action.data
            };
        case action_types.SEARCH_VIEW:
            return {
                ...state,
                searchView: action.data
            };
        default:
            return state;
    }
};