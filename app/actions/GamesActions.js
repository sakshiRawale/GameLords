import * as action_types from './action_types';

export const getGames = (data) => {
    return {
        type: action_types.GET_GAMES,
        data: data
    }
};

export const getGameDetail = (data) => {
    return {
        type: action_types.GET_GAME_DETAIL,
        data: data
    }
};


export const getSimilarGames = (data) => {
    return {
        type: action_types.GET_SIMILAR_GAMES,
        data: data
    }
};

export const getSearchGames = (data) => {
    return {
        type: action_types.GET_SEARCHED_GAMES,
        data: data
    }
};

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
