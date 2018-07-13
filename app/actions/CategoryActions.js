import * as action_types from './action_types';
import {console_log} from '../utils/helper';

export const getGameTypes = (data) => {
    return {
        type: action_types.GET_GAME_TYPES,
        data: data
    }
};

export const getCategories = (data) => {
    return {
        type: action_types.GET_CATEGORIES,
        data: data
    }
};

export const getCategoryDetail = (data) => {
    return {
        type: action_types.GET_CATEGORY_DETAIL,
        data: data
    }
};
