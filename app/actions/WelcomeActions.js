import * as action_types from './action_types';
import {console_log} from "../utils/helper";

export const checkAccess = (token) => {
    return {
        type: action_types.HAS_ACCESS,
        token: token
    }
};

export const addUid = (data) => {
    return {
        type: action_types.ADD_UID,
        data: data
    }
};
