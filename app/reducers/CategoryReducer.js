import * as action_types from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    packages: [],
    videos: [],
    categories: [],
    channels: []
};

export const CategoryReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.GET_VOD_CATEGORIES:
            return {
                ...state,
                packages: action.data.packages
            };
        case action_types.GET_VOD:
            let videos = state.videos.filter((v) => v.id != action.data.videos.id);
            return {
                ...state,
                videos: [
                    ...videos,
                    action.data.videos
                ]
            };
        case action_types.GET_CATEGORIES:
            return {
                ...state,
                categories: action.data.categories
            };
        case action_types.GET_CHANNELS:
            return {
                ...state,
                channels: action.data.channels
            };
        default:
            return state;
    }
};