import * as action_types from './action_types';
import {console_log} from "../utils/helper";

export const getFavouriteGames = (data) => {
    return {
        type: action_types.GET_FAVOURITE_GAMES,
        data: data
    }
};

export const setFavouriteGames = (data) => {
    return {
        type: action_types.SET_FAVOURITE_GAME,
        data: data
    }
};

export const getLikesGames = (data) => {
    return {
        type: action_types.SET_LIKES_GAME,
        data: data
    }
};
