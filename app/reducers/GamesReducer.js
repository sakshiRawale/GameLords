import {GET_GAMES, GET_GAME_DETAIL, GET_SIMILAR_GAMES, GET_SEARCHED_GAMES, SET_FAVOURITE_GAME,GET_FAVOURITE_GAMES } from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    games: [],
    gameDetail: [],
    similarGames: [],
    searchedGames: [],
};

export const GamesReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.data
            };
        case GET_GAME_DETAIL:
            return {
                ...state,
                gameDetail: action.data
            };
        case GET_SIMILAR_GAMES:
            return {
                ...state,
                similarGames: action.data
            };
        case GET_SEARCHED_GAMES:
            return {
                ...state,
                searchedGames: action.data
            };
        default:
            return state;
    }
};
