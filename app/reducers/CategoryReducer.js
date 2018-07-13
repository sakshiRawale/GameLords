import { GET_GAME_TYPES, GET_CATEGORIES, GET_CATEGORY_DETAIL } from '../actions/action_types';
import { console_log } from "../utils/helper";

const initialState = {
    gameType: [],
    category: [],
    categories: []
};

export const CategoryReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_GAME_TYPES:
            return {
                ...state,
                gameType: action.data.data
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.data.filter(g => { return g.categoryTypeName === 'HTML5' })
            };
        case GET_CATEGORY_DETAIL:
            return{
                ...state,
                category: action.data.data
            };
        default:
            return state;
    }
};
