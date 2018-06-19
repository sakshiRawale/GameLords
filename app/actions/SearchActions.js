import * as action_types from './action_types';
import {console_log} from "../utils/helper";

export const searchText = (searchText) => {
    return {
        type: action_types.SEARCH_TEXT,
        data: {
            text: searchText
        }
    }
};