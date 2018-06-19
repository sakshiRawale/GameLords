import * as action_types from './action_types';
import {console_log} from "../utils/helper";

export const addFavoriteChannel = (channels) => {
    return {
        type: action_types.ADD_FAVORITE_CHANNELS,
        data: channels
    }
};

export const addFavoriteVideo = (videos) => {
    return {
        type: action_types.ADD_FAVORITE_VIDEOS,
        data: videos
    }
};

export const addLikesChannels = (channels) => {
    return {
        type: action_types.ADD_LIKE_CHANNELS,
        data: channels
    }
};

export const addLikesVideos = (videos) => {
    return {
        type: action_types.ADD_LIKE_VIDEOS,
        data: videos
    }
};