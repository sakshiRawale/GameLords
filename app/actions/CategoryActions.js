import * as action_types from './action_types';
import {console_log} from '../utils/helper';

export const getVideosPackages = (data) => {
    return {
        type: action_types.GET_VOD_CATEGORIES,
        data: {
            packages: data
        }
    }
};

export const getVideos = (data) => {
    return {
        type: action_types.GET_VOD,
        data: {
            videos: data
        }
    }
};

export const getTVCategories = (data) => {
    return {
        type: action_types.GET_CATEGORIES,
        data: {
            categories: data
        }
    }
};

export const getChannels = (data) => {
    return {
        type: action_types.GET_CHANNELS,
        data: {
            channels: data
        }
    }
};