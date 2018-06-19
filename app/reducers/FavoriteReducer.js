import * as action_types from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    channels: [],
    videos: [],
    channelsLiked: [],
    videosLiked: []
};

export const FavoriteReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.ADD_FAVORITE_CHANNELS:
            return {
                ...state,
                channels: action.data
            };
        case action_types.ADD_FAVORITE_VIDEOS:
            return {
                ...state,
                videos: action.data
            };
        case action_types.ADD_LIKE_CHANNELS:
            return {
                ...state,
                channelsLiked: action.data
            };
        case action_types.ADD_LIKE_VIDEOS:
            return {
                ...state,
                videosLiked: action.data
            };
        default:
            return state;
    }
};