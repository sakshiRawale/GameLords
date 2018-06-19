import * as action_types from './action_types';
import {console_log} from "../utils/helper";

export const setHeaderTitle = (title) => {
    return {
        type: action_types.SET_HEADER_TITLE,
        data: {
            title: title
        }
    }
};

export const showSearchBar = (bool) => {
    return {
        type: action_types.SHOW_SEARCH,
        data: bool
    }
};

export const HideSearchBar = (bool) => {
    return {
        type: action_types.HIDE_SEARCH,
        data: bool
    }
};

export const onShowSearchView = (bool) => {
    return {
        type: action_types.SEARCH_VIEW,
        data: bool
    }
};

export const onBackAction = () => {
    return {
        type: action_types.ON_BACK_CLICK,
        data: true
    }
};

export const resetBack = () => {
    return {
        type: action_types.RESET_BACK_CLICK,
        data: false
    }
};