import * as action_types from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    games: [],
    likeGames: []
};

export const FavoriteReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.GET_FAVOURITE_GAMES:
            return {
                ...state,
                games: action.data.data
            };

        case action_types.SET_FAVOURITE_GAME:
            return {
                ...state,
                games: action.data
            };
        case action_types.SET_LIKES_GAME:
            return {
                ...state,
                likeGames: action.data.data
            };
        default:
            return state;
    }
};
